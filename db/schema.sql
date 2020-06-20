DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- create a department table
    -- id - INT PRIMARY KEY
    -- name - VARCHAR(30) to hold department name
    CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- create a roles table
    -- id - INT PRIMARY KEY
    -- title -  VARCHAR(30) to hold role title
    -- salary -  DECIMAL to hold role salary
    -- department_id -  INT to hold reference to department role belongs to
    CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- create an employees table
    -- id - INT PRIMARY KEY
    -- first_name - VARCHAR(30) to hold employee first name
    -- last_name - VARCHAR(30) to hold employee last name
    -- role_id - INT to hold reference to role employee has
    -- manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
    CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);