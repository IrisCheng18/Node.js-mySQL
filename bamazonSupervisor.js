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
                viewProducts();
                break;
            case 'Create New Department':
                viewLowInventory();
                break;
            default:
                connection.end();
        };


    });
};