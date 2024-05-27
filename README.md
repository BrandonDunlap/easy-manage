# Employee Tracker

## Description

Employee Tracker is a command-line application that allows business owners to manage their company's employee database. This application enables users to view and manage departments, roles, and employees within the company. The application is built using Node.js, Inquirer, and PostgreSQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Features](#features)
- [Video Walkthrough](#video-walkthrough)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and set up the Employee Tracker application, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone <your-repo-url>
    cd employee-tracker
    ```

2. Install the required Node.js packages:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```plaintext
    DB_HOST=localhost
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_NAME=employee_tracker
    DB_PORT=5432
    ```

4. Create the PostgreSQL database and set up the schema:

    - Open pgAdmin or use the `psql` command-line tool.
    - Create a new database named `employee_tracker`.

    ```bash
    psql -U postgres
    CREATE DATABASE employee_tracker;
    ```

    - Run the schema and seed files:

    ```bash
    psql -U postgres -d employee_tracker -f db/schema.sql
    psql -U postgres -d employee_tracker -f db/seeds.sql
    ```

## Usage

To use the Employee Tracker application, run the following command:

    ```bash
    node index.js
    ```

You will be presented with a menu of options to view and manage departments, roles, and employees. Select an option and follow the prompts to perform the desired action.

### Available Options

- View All Departments
- View All Roles
- View All Employees
- Add a Department
- Add a Role
- Add an Employee
- Update an Employee Role

## Database Schema

The database schema consists of three tables: `department`, `role`, and `employee`.

- `department`:
    - `id`: SERIAL PRIMARY KEY
    - `name`: VARCHAR(30) UNIQUE NOT NULL

- `role`:
    - `id`: SERIAL PRIMARY KEY
    - `title`: VARCHAR(30) UNIQUE NOT NULL
    - `salary`: DECIMAL NOT NULL
    - `department_id`: INTEGER NOT NULL REFERENCES department(id)

- `employee`:
    - `id`: SERIAL PRIMARY KEY
    - `first_name`: VARCHAR(30) NOT NULL
    - `last_name`: VARCHAR(30) NOT NULL
    - `role_id`: INTEGER NOT NULL REFERENCES role(id)
    - `manager_id`: INTEGER REFERENCES employee(id)

## Features

- View all departments with their names and IDs.
- View all roles with job titles, IDs, departments, and salaries.
- View all employees with their IDs, names, job titles, departments, salaries, and managers.
- Add new departments, roles, and employees to the database.
- Update an employee's role in the database.

## Video Walkthrough

A walkthrough video demonstrating the functionality of the Employee Tracker application can be found [here](https://youtu.be/qTlvm61xTp0).

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. Ensure your code follows best practices for file structure, naming conventions, and includes quality comments.

## License

This project is licensed under the MIT License.