// require mysql pkg
// use dotenv pkg

const connection = mysql.createConnection({
    // host - localhost
    // user
    // password
    // database name
});

connection.connect();

module.exports = connection;