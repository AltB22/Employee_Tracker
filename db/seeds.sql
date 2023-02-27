INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Head of Sales", 125000, 1),
       (2, "Salesperson", 100000, 1),
       (3, "Lead Engineer", 150000, 2),
       (4, "Software Engineer", 120000, 2),
       (5, "Account Manager", 170000, 3),
       (6, "Accountant", 120000, 3),
       (7, "Lead Counsel", 225000, 4),
       (8, "Lawyer", 170000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Steve", "Harrison", 1, NULL),
       (2, "Tim", "Burrows", 2, 1),
       (3, "William", "Massie", 3, NULL),
       (4, "Sarah", "Peters", 4, 3),
       (5, "Ashley", "Smith", 5, NULL),
       (6, "John", "Murphy", 6, 5),
       (7, "David", "Lacosta", 7, NULL),
       (8, "Christine", "Murray", 8, 7);


