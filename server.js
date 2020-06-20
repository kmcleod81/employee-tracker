const inquirer = require('inquirer');
const Database = require('./db/Database');
const newDB = new Database();
const connection = require('./db/connection');

// create a prompt when the app is started
// this will ask the user what they'd like to do
// choices : 

const startQuestion = [
    {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Add Department",
            "Add Role",
            "Update an Employee's Manager",
            "Quit"
        ]
    }
];

const start = () => {
    inquirer.prompt(startQuestion).then((answer) => {
        if (answer.choices === "View All Employees") {
            newDB.viewEmployees();
        } else if (answer.choices === "View All Employees by Department") {
            newDB.findEmployeesByDepartment();
        } else if (answer.choices === "Add Employee") {
            newDB.createEmployee();
        } else if (answer.choices === "Remove Employee") {
            newDB.removeEmployee();
        } else if (answer.choices === "Update Employee Role") {
            newDB.updateEmployeeRole();
        } else if (answer.choices === "Add Department") {
            newDB.createDepartment();
        } else if (answer.choices === "Add Role (please note: if the role is in a new department, the department must be created first.)") {
            newDB.createRole();
        } else if (answer.choices === "View all departments") {
            newDB.viewDepartments();
        } else if (answer.choices === "View all roles/titles") {
            newDB.viewRoles();
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
