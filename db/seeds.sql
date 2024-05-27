INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id) VALUES 
('Sales Lead', 100000, 1), 
('Salesperson', 80000, 1),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Lawyer', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Jim', 'Brown', 3, NULL),
('Jake', 'White', 4, NULL),
('Jill', 'Black', 5, NULL);
