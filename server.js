const inquirer = require('inquirer');
const Database = require('./db/Database');
const newDB = new Database();

// create a prompt when the app is started
// this will ask the user what they'd like to do
// choices : 

const startQuestion = [
    {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View Departments",
            "View Roles",
            "View Employees",
            "Update Employee Role",
            "Remove Employee",
            "Quit"
        ]
    }
];

const start = () => {
    inquirer.prompt(startQuestion).then((answer) => {

        if (answer.choices === "Add Department") {
            newDB.addDepartment();
        } else if (answer.choices === "Add Role") {
            newDB.addRole();
        } else if (answer.choices === "Add Employee") {
            newDB.addEmployee();
        } else if (answer.choices === "View Departments") {
            newDB.viewDepartments();
        } else if (answer.choices === "View Roles") {
            newDB.viewRoles();
        } else if (answer.choices === "View Employees") {
            newDB.viewEmployees();
        } else if (answer.choices === "Update Employee Role") {
            newDB.updateEmployeeRole();
        } else if (answer.choices === "Remove Employee") {
            newDB.removeEmployee();
        } else {
            newDB.quit();
            return;
        }
    });
};
start();
// if user selects view employees , its going to call getEmployees function down below
// call the findEmployees function from the database we created

// switch or if statement
// handles response and calls function
