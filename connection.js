// require inquirer and console.table
// require database class

// entrypoint to server
require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql');
const DB = require('./db/db');

const database = new DB();

// 
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});


// query's to the database happens inside this function below
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connection made to database.');
});

