const mysql = require("mysql2");
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

const allDepartments = () => {
  // Query Department
  db.promise()
    .query("SELECT * FROM department")
    .then(([data]) => {
      console.table(data);
      mainMenu();
    });
};

const allRoles = () => {
  // Query Role
  db.promise()
    .query(
      "SELECT title, salary, department.name as department FROM role left join department on role.department_id = department.id"
    )
    .then(([data]) => {
      console.table(data);
      mainMenu();
    });
};

const allEmployees = () => {
  // Query Employee
  db.promise()
    .query(
      "Select employee.first_name, employee.last_name, role.title, role.salary, department.name, concat(manager.first_name, ' ',manager.last_name) as manager FROM employee left join role on employee.role_id = role.id left join department on role.department_id = department.id left join employee manager on employee.manager_id = manager.id"
    )
    .then(([data]) => {
      console.table(data);
      mainMenu();
    });
};

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "work",
        message: "choose an option ",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
        ],
      },
    ])
    .then((data) => {
      switch (data.work) {
        case "View all departments":
          allDepartments();
          break;
        case "View all roles":
          allRoles();
          break;
        case "View all employees":
          allEmployees();
          break;
      }
    });
};
mainMenu();