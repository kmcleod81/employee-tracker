// Capital letter for Class

const connection = require('./connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
class Database {

    constructor() {
        this.connection = connection;
    }

    addDepartment() {
        inquirer
            .prompt({
                type: "input",
                name: "newDepartment",
                message: "What is the new department?",
            })
            .then((answer) => {
                //   Some validation in case the user doesn't type anything in.
                const newDepartment = answer.newDepartment;
                if (newDepartment === "") {
                    console.log(
                        "Oops, looks like you didn't enter a department name.  Try again"
                    );
                    this.addDepartment();
                } else {
                    // This allows the user to double check their input before it is entered into the database.
                    inquirer
                        .prompt({
                            type: "list",
                            name: "correct",
                            message: `You typed ${newDepartment} as the new department.  Is that correct?`,
                            choices: ["Yes", "No"],
                        })
                        .then((answer) => {
                            if (answer.correct === "No") {
                                console.log("Ok, lets try again.");
                                this.addDepartment();
                            } else {
                                const existingDepartments = [];
                                this.connection.query(
                                    "SELECT department FROM department",
                                    (err, result) => {
                                        if (err) throw err;
                                        result.forEach((department) => {
                                            existingDepartments.push(department.department);
                                        });
                                        // Validation to make sure the new department does not already exist in the database
                                        if (existingDepartments.includes(newDepartment)) {
                                            inquirer
                                                .prompt({
                                                    type: "list",
                                                    name: "tryAgain",
                                                    message:
                                                        "That department already exists.  Would you like to try again with a different department name, or quit?",
                                                    choices: ["Try again", "Quit"],
                                                })
                                                .then((answer) => {
                                                    if (answer.tryAgain === "Try again") {
                                                        this.addDepartment();
                                                    } else {
                                                        this.quit();
                                                    }
                                                });
                                        } else {
                                            this.connection.query(
                                                "INSERT INTO department (department) VALUES (?)",
                                                [newDepartment],
                                                (err) => {
                                                    if (err) throw err;
                                                    this.viewDepartments();
                                                    console.log("Here is the updated department list");
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        });
                }
            });
    }

    addEmployee() {
        //   Make multiple queries at once so we can get a list of departments and a list of employees to fill into two of the inquirer questions and then can utilize this info when we INSERT INTO employee later.
        this.connection.query(
            `SELECT id, first_name, last_name, manager_id FROM employee;
          SELECT id, title, department_id from role;`,
            (err, results) => {
                const roleArray = [];
                // Using the results from the first query, push each department into the roleArray
                results[1].forEach((item) => {
                    roleArray.push(item.title);
                });
                const employeeNames = ["None"];
                // Using the results from the second query, push each employee name (first and last) into the employeeNames array
                results[0].forEach((item) => {
                    const name = `${item.first_name} ${item.last_name}`;
                    employeeNames.push(name);
                });
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "What is the employee's first name?",
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "What is the employee's last name?",
                        },
                        {
                            type: "list",
                            name: "role",
                            message: "What is the employee's role?",
                            choices: roleArray,
                        },
                        {
                            type: "list",
                            name: "manager",
                            message: "Who is their manager?",
                            choices: employeeNames,
                        },
                    ])
                    .then((answers) => {
                        //   Some validation to make sure a first name and last name was typed.
                        if (answers.firstName === "" || answers.lastName === "") {
                            console.log(
                                "Oops, you forgot to type in a first or a last name.  Lets try again."
                            );
                            this.addEmployee();
                        } else {
                            //   take the name that the user selected in the manager questions and split it into two separate strings for first name and last name.
                            const managerName = answers.manager.split(" ");
                            let newManagerID;
                            // Compare what the user answered in the prompt for the manager question with each employee in the database.  If the user selected "None" for manager, then the managerID is set to null.  Otherwise, the managerID becomes the employee id of whichever employee matches the first and last name that was selected.
                            results[0].forEach((employee) => {
                                if (answers.manager === "None") {
                                    newManagerID = null;
                                } else if (
                                    employee.first_name === managerName[0] &&
                                    employee.last_name === managerName[1]
                                ) {
                                    newManagerID = employee.id;
                                }
                            });
                            let role;
                            // Compare the users answer to the role question with the role titles from the database, then set the role id using the query made at the start of this function.
                            results[1].forEach((item) => {
                                if (answers.role === item.title) {
                                    role = item.id;
                                    // Add the new employee and pass in the first and last names that were provided by the user
                                    this.connection.query(
                                        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                                        [answers.firstName, answers.lastName, role, newManagerID],
                                        (err) => {
                                            if (err) throw err;
                                            console.log(
                                                `The new employee, ${answers.firstName} ${answers.lastName}, has been added as a/an ${item.title}`
                                            );
                                            this.viewEmployees();
                                            console.log("Here is the updated Employee table");
                                        }
                                    );
                                }
                            });
                        }
                    });
            }
        );
    }


    addRole() {
        this.connection.query(
            "SELECT * FROM role; SELECT * FROM department;",
            (err, result) => {
                // generate an array of deparment names to put in the choices of one of the inquirer questions.
                const departmentArray = [];
                result[1].forEach((object) => {
                    let departmentName = object.department;
                    departmentArray.push(departmentName);
                });
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "newRole",
                            message: "What is the role title?",
                        },
                        {
                            type: "input",
                            name: "salary",
                            message:
                                "What is the salary for this role? (No commas, numbers only)",
                        },
                        {
                            type: "list",
                            name: "department",
                            message: "What department is this role in?",
                            choices: departmentArray,
                        },
                    ])
                    .then((answers) => {
                        // find the department id that matches the department the user selected and set it to departmentID
                        let departmentID;
                        result[1].forEach((object) => {
                            if (object.department === answers.department) {
                                departmentID = object.id;
                            }
                        });
                        // put existing roles in an array so we can check whether the new role already exists.
                        const existingRolesArray = [];
                        result[0].forEach((roleObject) => {
                            const existingRole = roleObject.title;
                            existingRolesArray.push(existingRole);
                        });
                        // make sure the salary is a number
                        const salary = parseInt(answers.salary);
                        // This checks whether a role of the title the user gave already exists.  If it does, it will not create the new role and will allow them to enter a different new role, or else just quit.
                        if (existingRolesArray.includes(answers.newRole)) {
                            inquirer
                                .prompt({
                                    type: "list",
                                    name: "tryAgain",
                                    message:
                                        "That role already exists.  You cannot add a role with the same title as an existing role.Would you like to add a different role?",
                                    choices: ["Yes", "No"],
                                })
                                .then((tryAgainAnswer) => {
                                    if (tryAgainAnswer.tryAgain === "Yes") {
                                        this.addRole();
                                    } else {
                                        this.quit();
                                    }
                                });
                            // This checks to make sure there was input provided for each question.  If not, it runs the prompt again
                        } else if (
                            answers.newRole == "" ||
                            answers.newRole == null ||
                            answers.salary == ""
                        ) {
                            console.log(
                                "Oops, you forgot to type in the role title or the salary.  Please try again"
                            );
                            this.addRole();
                        } else {
                            this.connection.query(
                                "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                                [answers.newRole, salary, departmentID],
                                (err) => {
                                    if (err) throw err;
                                    console.log("New role succesfully added.");
                                }
                            );
                            this.quit();
                        }
                    });
            }
        );
    }

    viewDepartments() {
        this.connection.query("SELECT * FROM department", (err, result) => {
            if (err) throw err;
            console.table(result);
        });
        this.quit();
    }

    viewEmployees() {
        this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.salary, department.department, role.title, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id=role.id) LEFT JOIN department ON (role.department_id=department.id);",
            (err, results) => {
                if (err) {
                    throw err;
                }
                console.table(results);
            }
        );
        this.quit();
    }

    findEmployeesByDepartment() {
        this.connection.query(
            "SELECT department FROM department",
            (err, result) => {
                if (err) {
                    throw err;
                }
                // push each department name into an array so we can use the department names as choices in the inquirer prompt.
                const departmentArray = [];
                result.forEach((department) => {
                    departmentArray.push(department.department);
                });
                inquirer
                    .prompt({
                        type: "list",
                        name: "department",
                        message: "Which department would you like to view?",
                        choices: departmentArray,
                    })
                    .then((answer) => {
                        this.connection.query(
                            "SELECT employee.id, employee.first_name, employee.last_name, role.salary, department.department, role.title, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id=role.id) LEFT JOIN department ON (role.department_id=department.id) WHERE department.department=?;",
                            [answer.department],
                            (err, results) => {
                                if (err) {
                                    throw err;
                                }
                                console.table(results);
                            }
                        );
                        this.quit();
                    });
            }
        );
    }

    viewRoles() {
        this.connection.query(
            "SELECT id, title, salary FROM role",
            (err, result) => {
                if (err) throw err;
                console.table(result);
            }
        );
        this.quit();
    }

    updateEmployeeRole() {
        //   make queries to the role and employee tables so that the choices for the prompt questions can be provided
        this.connection.query(
            `SELECT * FROM role; SELECT * FROM employee;`,
            (err, results) => {
                const nameArray = ["Nevermind, I don't want to make an update"];
                //   for each employee in the employee table, string together the first and last names and push them to the nameArray
                results[1].forEach((employee) => {
                    const name = `${employee.first_name} ${employee.last_name}`;
                    nameArray.push(name);
                });
                //   for each role in the role table, push the title to the roleArray.
                const roleArray = [];
                results[0].forEach((role) => {
                    roleArray.push(role.title);
                });
                inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "employee",
                            message: "Which employee would you like to update?",
                            choices: nameArray,
                        },
                        {
                            type: "list",
                            name: "newRole",
                            message: "What is their new role?",
                            choices: roleArray,
                        },
                    ])
                    .then((answers) => {
                        //   match the role the user provided in the inquirer answer to the role in the database and set the id to the roleID variable to be passed into the UPDATE
                        const matchingRole = results[0].find(
                            (element) => element.title === answers.newRole
                        );
                        const roleID = matchingRole.id;
                        //   Split the employee name from the answer into 2 separate strings for first and last name
                        const employeeName = answers.employee.split(" ");
                        //   find where the prompt answer names match the names in the database and set the id to the new variable employeeID which will be passed into the UPDATE statement
                        const matchingEmployeeObject = results[1].find(
                            (element) =>
                                element.first_name === employeeName[0] &&
                                element.last_name === employeeName[1]
                        );
                        const employeeID = matchingEmployeeObject.id;
                        this.connection.query(
                            "UPDATE employee SET role_id=? WHERE id=?",
                            [roleID, employeeID],
                            (err) => {
                                if (err) throw err;
                                console.log(
                                    `${answers.employee}'s role has been updated to ${answers.newRole}`
                                );
                            }
                        );
                        this.quit();
                    });
            }
        );
    }


    removeEmployee() {
        //   connect to db to get employee list
        this.connection.query(
            "SELECT first_name, last_name FROM employee",
            (err, result) => {
                const namesArray = [];
                //   Use a forEach to join first name to the last name of employees
                result.forEach((name) => {
                    const fullName = `${name.first_name} ${name.last_name}`;
                    namesArray.push(fullName);
                });
                inquirer
                    .prompt({
                        type: "list",
                        name: "employee",
                        message: "Which employee would you like to remove?",
                        choices: namesArray,
                    })
                    .then((answer) => {
                        const splitNames = answer.employee.split(" ");
                        this.connection.query(
                            "DELETE FROM employee WHERE first_name=? AND last_name=?",
                            [splitNames[0], splitNames[1]],
                            (err) => {
                                if (err) throw err;
                                console.log(
                                    `${answer.employee} has been removed from the database.`
                                );
                            }
                        );
                        this.quit();
                    });
            }
        );
    }

    quit() {
        this.connection.end();
    }

}


module.exports = Database;