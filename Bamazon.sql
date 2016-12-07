create database Bamazon;

create table products (
item_id integer(10) auto_increment not null,
product_name varchar(200),
department_name varchar(200),
price decimal(20),
stock_quantity integer(200),
Primary Key(item_id)
);

USE Bamazon;
alter table products;
modify price decimal (10.2),

INSERT INTO products (products_name, department_name, price, stock_quantity)
VALUES ("Apples","Produce", 2.50, 57);
INSERT INTO favorite_foods (food)
VALUES ("Asian");
INSERT INTO favorite_foods (food)
VALUES ("American");
INSERT INTO favorite_foods (food)
VALUES ("Italian");
INSERT INTO favorite_foods (food)
VALUES ("Asian");
INSERT INTO favorite_foods (food)
VALUES ("American");
INSERT INTO favorite_foods (food)
VALUES ("Italian");
INSERT INTO favorite_foods (food)
VALUES ("Asian");
INSERT INTO favorite_foods (food)
VALUES ("American");
INSERT INTO favorite_foods (food)
VALUES ("Italian");
INSERT INTO favorite_foods (food)
VALUES ("Asian");
INSERT INTO favorite_foods (food)
VALUES ("American");
