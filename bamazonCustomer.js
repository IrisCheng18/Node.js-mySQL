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

    connection.query('SELECT item_id AS "Item ID", product_name AS Name, department_name AS Department, price AS Price, stock_quantity AS Quantity From products', function (error, results) {
        if (error) throw error;

        console.table(results);
        products = results;
        buyItem();
    });
});


function buyItem() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which ID of the product would you like to buy? (Quit with Q)',
            name: 'productID'
        }
    ]).then(function (response) {
        if (!isNaN(response.productID)) {
            inputUnits(response.productID);
        } else if (response.productID.toUpperCase() === 'Q') {
            console.log(chalk.green("Thank you for shopping with us. Good bye!"));
            connection.end();
        } else {
            console.log(chalk.red("Invalid number!!"));
            buyItem();
        };
    });
};

function inputUnits(productID) {
    inquirer.prompt([
        {
            type: 'input',
            message: 'How many units of product would you like to buy? (Quit with Q)',
            name: 'units'
        }
    ]).then(function (response) {
        if (!isNaN(response.units)) {
            if (response.units > products[productID - 1].Quantity) {
                console.log(chalk.yellow('Sorry. Insufficient quantity!'));
             buyItem();
            } else {
                updateProducts(productID, response.units);
            };
        } else if (response.units.toUpperCase() === 'Q') {
            console.log(chalk.green("Thank you for shopping with us. Good bye!"));
            connection.end();
        } else {
            console.log(chalk.red("Invalid number!!"));
            inputUnits(productID);
        };
    });
};

function updateProducts(productID, units) {
    connection.query('UPDATE products SET ? WHERE ?', [
        {
            stock_quantity: products[productID - 1].Quantity - units
        },
        {
            item_id: productID
        }
    ], function (err, res) {
        if (err) throw err;

        readProducts(productID, units);
    });
};

function readProducts(productID, units) {
    connection.query('SELECT item_id AS "Item ID", product_name AS Name, department_name AS Department, price AS Price, stock_quantity AS Quantity From products', function (error, results) {
        if (error) throw error;
        console.log(chalk.green('\nSuccessfully purchased ' + units + ' ' + products[productID - 1].product_name + ' at the total price of $' + units * products[productID].price + '.\n'));
        console.table(results);

        products = results;
        buyItem();
    });
};