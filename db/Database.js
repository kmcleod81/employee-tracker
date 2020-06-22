// Capital letter for Class

const connection = require('./connection');
const inquirer = require("inquirer");

class Database {

    constructor(connection) {
        this.connection = connection;
    }

    addDepartment() {
        inquirer.prompt({
            type: "input",
            name: "newDepartment",
            message: "Enter New Department",
        })
            .then((answer) => {
                const existingDepartments = [];
                this.connection.query(
                    "SELECT department FROM department",
                    (err, result) => {
                        if (err) throw err;
                        result.forEach((department) => {
                            existingDepartments.push(department.department);
                        })
                        this.addDepartment();
                    }
                )
            })
        this.quit();
    }


    addEmployee(employee) {
        return this.connection.query(
            // 'INSERT INTO employee SET ?',
            // {
            //     first_name: employee.first_name,
            //     last_name: employee.last_name,
            //     role_id: employee.role_id,
            //     manager_id: employee.manager_id,
            // },
            // (err) => {
            //     if (err) {
            //         throw err;
            //     }
            //     console.log(res.affectedRows + 'Employee created!\n');
            // }
        );
    }

    addRole(role) {
        return this.connection.query(
            /*       'INSERT INTO role SET ?',
                  {
                      title: role.title,
                      salary: role.salary,
                      department_id: role.department_id,
                  },
                  (err) => {
                      if (err) {
                          throw err;
                      }
                      console.log(res.affectedRows + 'Role created!\n');
                  } */
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

    updateEmployees() {
        return this.connection.query(

        );
    }

    quit() {
        this.connection.end();
    }

}


module.exports = Database;