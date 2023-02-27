INSERT INTO department ( name)
VALUES ( "Sales"),
       ( "Engineering"),
       ( "Finance"),
       ( "Legal");

INSERT INTO role ( title, salary, department_id)
VALUES ( "Head of Sales", 125000, 1),
       ( "Salesperson", 100000, 1),
       ( "Lead Engineer", 150000, 2),
       ( "Software Engineer", 120000, 2),
       ( "Account Manager", 170000, 3),
       ( "Accountant", 120000, 3),
       ( "Lead Counsel", 225000, 4),
       ( "Lawyer", 170000, 4);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Steve", "Harrison", 1, NULL),
       ( "Tim", "Burrows", 2, 1),
       ( "William", "Massie", 3, NULL),
       ( "Sarah", "Peters", 4, 3),
       ( "Ashley", "Smith", 5, NULL),
       ( "John", "Murphy", 6, 5),
       ( "David", "Lacosta", 7, NULL),
       ( "Christine", "Murray", 8, 7);


