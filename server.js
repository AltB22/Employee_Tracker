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

db.connect(function(err){
    if(err)throw err;
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
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "add an employee role"]
        }).then((answer)=>{
            switch(answer.options){
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
                    AddRole();
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

function showAllDepartments(){
    let query = 'SELECT * from department';
    db.query(query, function(err, res){
        if(err)throw err;
        console.table('Departments', res);
        menu();
    })
}


