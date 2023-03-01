//requires mysql2, inquirer & console.table to be installed (npm i)
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


// Connect to database, will be referred as db.x hereafter
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'PASSWORD',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);

//callback function to throw error if error or call menu() function
db.connect(function (err) {
    if (err) throw err;
    menu();
});

//menu function to serve as main menu of list options for to choose actions to be taken.  Depending on the selection made, switch / case statment below will direct user to the appropriate function.
function menu() {
    inquirer.prompt(
        {
            type: "list",
            name: "options",
            message: "Which option would you like to select",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "delete an employee", "add an employee role", "Quit"]
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
                case "delete an employee":
                    deleteEmployee();
                    break;
                case "add an employee role":
                    addEmployeeRole();
                    break;
                case "Quit":
                    quitApp();
                    break;
                default:
                    quitApp();
            };
        });
};

//Displays all departments with a simple select all from departments query.  Displays using console.table labeled as "Departments"
function showAllDepartments() {
    let query = 'SELECT * from department';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('Departments', res);
        menu();
    });
};

//Creates a hybrid table displaying role title, role id, and role salary from role table, and joins department name wherever department ids match in the two tables.  
function viewAllRoles() {
    let query = 'SELECT role.title, role.id AS role_id, department.name AS department_name, role.salary FROM role JOIN department ON role.department_id = department.id'

    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('Roles', res);
        menu();
    });
};

//Creates a custom / hybrid table to display the data as laid out by the acceptance criteria.  This took some serious google searching and research as well as guidance from tutor and about 50x with errors before it finally worked!! I had to build a spreadsheet with all the table colums laid out to visualize it and then make selections in the sheet and transferred into squl query syntax.  Would have preferred to utilize the query.sql file for all of these but it works this way and need to move on!!  Also displays the results via console.table as "Employees".
function viewAllEmployees() {
    let query = 'SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department_name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee employee JOIN role role ON employee.role_id = role.id JOIN department department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;'

    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('Employees', res);
        menu();
    });
};

//Gives the user ability to input a new department.  Auto Increment feature will automatically assign a department number to new departments.  Displays updated department table as "Departments" and console logs successful add.
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

//Gives the user the ability to add a role including salary and which dept to assign to and displays updated table afterwards as well as confirmation via console log of adding the role.
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
            message: "Please enter the department id of the role you would you like to add (must be a number)"
        },
    ]).then((answer) => {
        db.query(
            'INSERT INTO role SET ?',
            {
                title: answer.newRole,
                salary: answer.newRoleSalary,
                department_id: answer.newRoleDept,
            });
        let query = 'SELECT * FROM role';
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log('New role has been successfully added');
            console.table('Roles:', res);
            menu();
        })

    });

}

//Gives the user ability to add a new employee assigning all the require table column data per schema. (auto-increment will assign the id)
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newEmployeeFirstName',
            message: "Please enter the new employee's first name."
        },
        {
            type: 'input',
            name: 'newEmployeeLastName',
            message: "Please enter the new employee's last name."
        },
        {
            type: 'input',
            name: 'newEmployeeRole',
            message: "Please enter the the role id for the new employee you would you like to add."
        },
        {
            type: 'input',
            name: 'newEmployeeManager',
            message: "Please enter the manager id for the new employee you would like to add. (must be a number)"
        },
    ]).then((answer) => {
        db.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.newEmployeeFirstName,
                last_name: answer.newEmployeeLastName,
                role_id: answer.newEmployeeRole,
                manager_id: answer.newEmployeeManager,
            });
        let query = 'SELECT * FROM employee';
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log('New role has been successfully added');
            console.table('Employees:', res);
            menu();
        })

    });

};

//Gives the user abiltiy to delete an employee from database.
function deleteEmployee() {
    db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name from employee',
        (err, res) => {
            if (err) throw err;

            inquirer.prompt(
                {
                    type: 'list',
                    name: 'employeeName',
                    message: 'Which employee would you like to delete?',
                    choices: res.map((employee) => ({ name: employee.name, value: employee.id }))
                }
            ).then((answer) => {



                db.query('DELETE FROM employee WHERE id = ?', [answer.employeeName], (err) => {
                    if (err) throw err;
                    console.log(`Employee ${answer.employeeName} has been deleted}`);
                    // console.table('Employees:', res);
                    menu();
                });
            });
        });
};

//Gives user ability to assign a new role to an employee.  Multiple employees may be assigned to the same role (ie more than 1 salesperson...).  
function addEmployeeRole() {
    db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name from employee',
        (err, res) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeName',
                    message: 'Which employee would you like to update the role for?',
                    choices: res.map((employee) => ({ name: employee.name, value: employee.id }))
                },
                {
                    type: 'input',
                    name: 'newEmployeeRole',
                    message: "Please enter the role id of the employee's new role. (must be a number)",
                }
            ]).then((answer) => {
                let employeeId = answer.employeeName;
                let newRoleId = answer.newEmployeeRole;

                db.query(
                    'UPDATE employee SET role_id = ? WHERE id = ?',

                    [newRoleId, employeeId],
                    (err, res) => {
                        if (err) throw err;
                        console.log('New role has been successfully added');
                        // console.table('Employees:', res);
                        menu();
                    });
            });
        });
};

//Exits the application
function quitApp() {
    db.end();
    console.log("Good-Bye");
};