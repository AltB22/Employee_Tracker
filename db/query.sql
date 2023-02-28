SELECT role.title AS title, role.id, role.salary FROM role
JOIN department.name ON role.department_id = department.id