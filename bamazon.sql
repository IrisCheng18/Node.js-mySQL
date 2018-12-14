DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES
("Milk", "Dairy", 4.59, 50),
("Jack Link's Beef Jerky", "Snacks", 4.59, 20),
("Guitar", "Musical Instruments", 64.99, 5),
("National Geograhpic", "Magazines", 25, 25),
("Instant Pot", "Kitchen", 79, 10),
("Gone with the wind", "Movies", 17.99, 5),
("Mrs. Meyers Hand Soap", "Beauty and Healthcare", 3.99, 50),
("The Da Vinci Code", "Books", 8.99, 30),
("Kindle E-reader", "Electronics", 79.99, 40),
("Golf Tee", "Sports", 2.99, 100);

SELECT * FROM products;
UPDATE products SET stock_quantity = 1 WHERE item_id = 10;