var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var products = [];
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon',
    port: 3306
});

connection.connect(function (err) {
    if (err) throw err;

    chooseMenuOptions();
});

function chooseMenuOptions() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select menu options',
            choices: [
                'View Product Sales by Department',
                'Create New Department',
                'Quit'
            ],
            name: 'choice'
        }
    ]).then(function (response) {
        switch (response.choice) {
            case 'View Product Sales by Department':
                viewProductSalesByDepartment();
                break;
            case 'Create New Department':
                addNewDepartment();
                break;
            default:
                connection.end();
        };


    });
};

function viewProductSalesByDepartment() {
    connection.query('SELECT departments.department_name AS Department, ANY_VALUE(departments.over_head_costs) AS "Overhead Costs", ANY_VALUE(SUM(products.product_sales)) AS "Product Sales", ANY_VALUE(SUM(products.product_sales) - departments.over_head_costs) AS "Total Profit" FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name', function (error, results) {
        if (error) throw error;

        console.table(results);
        chooseMenuOptions();
    });
};

function addNewDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Department Name: ",
            name: "department"
        },
        {
            type: "input",
            message: "Overhead Costs: ",
            name: "overhead"
        },
    ]).then(function (response) {
        connection.query(`INSERT INTO departments(department_name, over_head_costs) VALUES (?, ?);`, [
            response.department,
            response.overhead
        ], function (err, results) {
            if (err) throw err;

            viewProductSalesByDepartment();
        });
    });
};