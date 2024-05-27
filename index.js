const inquirer = require('inquirer');
const { query } = require('./db/queries');

const mainMenu = () => {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
      default:
        process.exit();
    }
  });
};

const viewAllDepartments = async () => {
  const res = await query('SELECT * FROM department');
  console.table(res.rows);
  mainMenu();
};

const viewAllRoles = async () => {
  const res = await query(`
    SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    JOIN department ON role.department_id = department.id`);
  console.table(res.rows);
  mainMenu();
};

const viewAllEmployees = async () => {
  const res = await query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id`);
  console.table(res.rows);
  mainMenu();
};

const addDepartment = () => {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:'
  }).then(async answer => {
    await query('INSERT INTO department (name) VALUES ($1)', [answer.name]);
    console.log(`Added ${answer.name} to the database.`);
    mainMenu();
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the name of the role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary for the role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID for the role:'
    }
  ]).then(async answers => {
    await query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id]);
    console.log(`Added ${answers.title} to the database.`);
    mainMenu();
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name of the employee:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the role ID for the employee:'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID for the employee (leave blank if none):',
      default: null
    }
  ]).then(async answers => {
    await query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
    console.log(`Added ${answers.first_name} ${answers.last_name} to the database.`);
    mainMenu();
  });
};

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the employee ID to update:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID for the employee:'
    }
  ]).then(async answers => {
    await query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id]);
    console.log(`Updated employee's role.`);
    mainMenu();
  });
};

mainMenu();
