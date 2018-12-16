DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INTEGER(10),
    product_sales DECIMAL(20, 2),
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100),
    over_head_costs INTEGER(10),
    PRIMARY KEY (department_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) 
VALUES
("Milk", "Dairy", 4.59, 50, 4.59 * 50),
("Jack Link's Beef Jerky", "Snacks", 4.59, 20, 4.59 * 20),
("Guitar", "Musical Instruments", 64.99, 5, 64.99 * 5),
("National Geograhpic", "Magazines", 25, 25, 25 * 25),
("Instant Pot", "Kitchen", 79, 10, 79 * 10),
("Gone with the wind", "Movies", 17.99, 5, 17.99 *5),
("Mrs. Meyers Hand Soap", "Beauty and Healthcare", 3.99, 50, 3.99 * 50),
("The Da Vinci Code", "Books", 8.99, 30, 8.99 * 30),
("Kindle E-reader", "Electronics", 79.99, 40, 79.99 * 40),
("Golf Tee", "Sports", 2.99, 100, 2.99 * 100);

SELECT * FROM products;
UPDATE products SET stock_quantity = stock_quantity + 1, product_sales = price * stock_quantity  WHERE product_name = 'Milk' AND item_id <> 0;
SELECT item_id AS "Item IDs", product_name AS Name, price AS Price, stock_quantity AS Quantities From products;
SELECT item_id AS "Item IDs", product_name AS Name, price AS Price, stock_quantity AS Quantities From products WHERE stock_quantity < 5;
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES ('Apple', 'Grocery', 1.99, 20, 1.99 * 20);

