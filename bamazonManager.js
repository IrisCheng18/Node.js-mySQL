var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require("chalk");
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
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Quit'
            ],
            name: 'choice'
        }
    ]).then(function (response) {
        switch (response.choice) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                break;
            case 'Add to Inventory':
                break;
            case 'Add New Product':
                break;
            default:
                connection.end();
        };


    });
};

function viewProducts() {
    connection.query('SELECT item_id AS "Item IDs", product_name AS Name, price AS Price, stock_quantity AS Quantities From products', function (error, results) {
        if (error) throw error;
        
        console.table(results);
        chooseMenuOptions();
    });
};