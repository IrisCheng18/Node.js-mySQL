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
                viewLowInventory();
                break;
            case 'Add to Inventory':
                updateInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            default:
                connection.end();
        };


    });
};

function viewProducts() {
    connection.query('SELECT item_id AS "Item IDs", product_name AS Name, department_name AS Department, price AS Price, stock_quantity AS Quantities, product_sales AS "Product Sales" From products', function (error, results) {
        if (error) throw error;

        console.table(results);
        chooseMenuOptions();
    });
};

function viewLowInventory() {
    connection.query('SELECT item_id AS "Item IDs", product_name AS Name, price AS Price, stock_quantity AS Quantities From products WHERE stock_quantity < 5', function (error, results) {
        if (error) throw error;

        console.table(results);
        chooseMenuOptions();
    });
};

function updateInventory() {
    connection.query('SELECT product_name AS Name From products', function (error, results) {
        if (error) throw error;

        var productNames = [];
        results.forEach(element => {
            productNames.push(element.Name);
        });

        inquirer.prompt([
            {
                type: 'rawlist',
                message: 'Which product would you like to add more?',
                choices: productNames,
                name: 'choice'
            }
        ]).then(function (choiceResponse) {
            console.log(choiceResponse);
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Input the quantity to add: ',
                    name: 'quantity'
                }
            ]).then(function (quantityResponse) {
                connection.query('SELECT price, stock_quantity FROM products WHERE ? AND item_id <> 0', [
                    {
                        product_name: choiceResponse.choice
                    }
                ], function (err, res) {
                    if (err) throw err;

                    connection.query('UPDATE products SET ?, ? WHERE ? AND item_id <> 0', [
                        {
                            stock_quantity: res[0].stock_quantity + parseInt(quantityResponse.quantity),
                        },
                        {
                            product_sales: res[0].price * (res[0].stock_quantity + parseInt(quantityResponse.quantity))
                        },  
                        {
                            product_name: choiceResponse.choice
                        }
                    ], function (err, res) {
                        if (err) throw err;

                        viewProducts();
                    });
                });
            });
        });
    });

};

function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "Product Name: ",
            name: "productName"
        },
        {
            type: "input",
            message: "Department Name: ",
            name: "department"
        },
        {
            type: "input",
            message: "Price: ",
            name: "price"
        },
        {
            type: "input",
            message: "Stock Quantity: ",
            name: "quantity"
        }
    ]).then(function(response) {
        connection.query(`INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES (?, ?, ?, ?, ?);`, [
            response.productName, 
            response.department, 
            response.price, 
            response.quantity,
            response.price * response.quantity
        ], function(err, results) {
            if (err) throw err;

            viewProducts();
        });
    });
};