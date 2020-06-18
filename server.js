const inquirer = require('inquirer');
const Database = require('./db/Database');
const newDB = new Database();
const connection = require('./db/connection');
const { end } = require('./db/connection');

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
// if user selects view employees , its going to call getEmployees function down below
// call the findEmployees function from the database we created


// switch or if statement
// handles response and calls function


start();