const mysql = require("mysql2");
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
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

const newDepartment = (newDepartmentName) => {
  // Query Department
  db.promise()
    .query("INSERT INTO department (name) VALUES (?)", [newDepartmentName])
    .then(() => {
      console.log("New department added successfully!");
      mainMenu();
    })
    .catch((error) => {
      console.error("Error adding new department:", error);
      mainMenu();
    });
};

const allRoles = () => {
  // Query Role
  db.promise()
    .query(
      "SELECT title, salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id"
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
      "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id"
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
        message: "Choose an option",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Delete a department",
          "Exit",
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
        case "Add a new department":
          addDepartment();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "Exit":
          process.exit();
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartmentName",
        message: "Enter the name of the new department:",
      },
    ])
    .then((data) => {
      const newDepartmentName = data.newDepartmentName;
      newDepartment(newDepartmentName);
    });
};

const deleteDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentId",
        message: "Enter the ID of the department to delete:",
      },
    ])
    .then((data) => {
      const departmentId = data.departmentId;
      removeDepartment(departmentId);
    });
};

const removeDepartment = (departmentId) => {
  db.promise()
    .query("DELETE FROM department WHERE id = ?", [departmentId])
    .then(() => {
      console.log("Department deleted successfully!");
      mainMenu();
    });
};

mainMenu();
