// Capital letter for Class

const connection = require('./connection');
const inquirer = require("inquirer");
class Database {

    constructor(connection) {
        this.connection = connection;
    }

    createDepartment(department) {
        return this.connection.query(
            'INSERT INTO department SET ?',
            {
                department: department.name,
            },
            (err) => {
                if (err) {
                    throw err;
                }
                console.log(res.affectedRows + 'Department created!\n');
            }
        );
    }

    createEmployee(employee) {
        return this.connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: employee.first_name,
                last_name: employee.last_name,
                role_id: employee.role_id,
                manager_id: employee.manager_id,
            },
            (err) => {
                if (err) {
                    throw err;
                }
                console.log(res.affectedRows + 'Employee created!\n');
            }
        );
    }

    createRole(role) {
        return this.connection.query(
            'INSERT INTO role SET ?',
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
            }
        );
    }

    findDepartment() {
        return this.connection.query(

        );
    }
    findEmployee() {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM EMPLOYEE"
        );
    }

    findRole() {
        return this.connection.query(

        );
    }
}

module.exports = Database;