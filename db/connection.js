// require mysql pkg
// use dotenv pkg

require("dotenv").config();
const mysql = require('mysql');

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}



// query's to the database happens inside this function below
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected to the database");
});

module.exports = connection;