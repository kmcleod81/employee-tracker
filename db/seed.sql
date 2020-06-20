USE employees_db;

INSERT INTO department (department)
VALUES ("Human Resources"), ("Accounting"), ("Sales"), ("Marketing"), ("Research"), ("Management"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES 
("Hiring Director", 95000, 1),
("HR representative", 75000, 1) , 
("Accountant", 82000, 2), 
("Sales Lead", 123000, 3), 
("Salesperson", 80000, 3), 
("Team Manager" , 85000, 6), 
("Marketing Director", 80000, 4), 
("Marketing Consultant", 87000, 4), 
("Research Lead", 100000, 5), 
("Researcher", 70000, 5), 
("Lead Engineer", 155000, 6), 
("Engineer", 120000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Daniel", "Ostojak", 1, null), 
("Karla", "McLeod", 5, null), 
("Karla", "Marcotte", 2, 1), 
("Marilyn", "McLeod", 3, null)