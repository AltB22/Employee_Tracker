const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table')


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'PASSWORD',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    menu();
}
)
// db.query('SELECT * FROM employees', function (err, results) {
//     console.log(results);
// });

function menu() {
    inquirer.prompt(
        {
            type: "list",
            name: "options",
            message: "Which option would you like to select",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "add an employee role", "Quit"]
        }).then((answer) => {
            switch (answer.options) {
                case "view all departments":
                    showAllDepartments();
                    console.log('hello');
                    break;
                case "view all roles":
                    viewAllRoles();
                    break;
                case "view all employees":
                    viewAllEmployees();
                    break;
                case "add a department":
                    addDepartment();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add an employee":
                    addEmployee();
                    break;
                case "add an employee role":
                    addEmployeeRole();
                    break;
                case "Quit":
                    quitApp();
                    break;
                default:
                    quitApp();
            }
        })
}

function showAllDepartments() {
    let query = 'SELECT * from department';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('Departments', res);
        menu();
    })
}

function viewAllRoles() {
    // let query = 'SELECT * from role';
    let query = 'SELECT role.title, role.id AS role_id, department.name AS department_name, role.salary FROM role JOIN department ON role.department_id = department.id'

    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('Roles', res);
        menu();
    })
}

function viewAllEmployees() {
    let query = 'SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department_name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee employee JOIN role role ON employee.role_id = role.id JOIN department department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;'

    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('Employees', res);
        menu();
    })
}

function addDepartment() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'newDepartment',
            message: "Please enter the department you would you like to add."
        }
    ).then((answer) => {
        db.query(
            'INSERT INTO department SET ?',
            {
                name: answer.newDepartment
            });
        let query = 'SELECT * FROM department';
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log('New department has been successfully added');
            console.table('Departments:', res);
            menu();
        })

    });

};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: "Please enter the role you would you like to add."
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: "Please enter the salary for the role you would you like to add."
        },
        {
            type: 'input',
            name: 'newRoleDept',
            message: "Please enter the department of the role you would you like to add."
        },
    ]).then((answer) => {
        db.query(
            'INSERT INTO role SET ?',
            {
                name: answer.newDepartment
            });
        let query = 'SELECT * FROM department';
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log('New department has been successfully added');
            console.table('Departments:', res);
            menu();
        })

    });

}
