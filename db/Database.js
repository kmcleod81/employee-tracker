// Capital letter for Class

const connection = require('.connection');

class Database {

    constructor(connection) {
        this.connection = connection;
    }

    createDepartment() {
        return this.connection.query(

        );
    }

    createEmployee() {
        return this.connection.query(

        );
    }

    createRole() {
        return this.connection.query(

        );
    }

    findDepartment() {
        return this.connection.query(

        );
    }
    findEmployee() {
        return this.connection.query(

        );
    }

    findRole() {
        return this.connection.query(

        );
    }
}