-- Audrey Flanders, Jacob Summers
-- Team 29

-- Citation for the table queries:
-- Date 7/17/23
-- Adapted from OSU CS 340 module 3: Activity 1 and Activity 3 example code, attributes and values are our own work
-- Source URL: https://canvas.oregonstate.edu/courses/1922991/modules/items/23329597

-- This file created tables for Merchandise, Books, Customers, Employees, Sales, Merchandise Sales, and Book Sales.
-- There is a M:N realtionship between Merchandise and Sales facilitated by the Merchandise Sales intersection table.
-- There is a M:N realtionship between Books and Sales facilitated by the Books Sales intersection table.
-- There is a 1:M realtionship between Customers and Sales.
-- There is an optional 1:M realtionship between Employees and Sales.

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/* Create Merchandise Table - used to display important merchandise information such as merch ID, name, price, and stock. */ 
CREATE OR REPLACE TABLE Merchandise (
    merchID INT(10) NOT NULL AUTO_INCREMENT,
    merchName VARCHAR(45) NOT NULL,
    merchPrice DECIMAL(6,2) NOT NULL,
    merchQuantity INT(10) NOT NULL,
    PRIMARY KEY (merchID)
);

/* Create Books Table - used to display important book information such as book ID, Title, Author, year published, genre, price, and stock. */
CREATE OR REPLACE TABLE Books (
    bookID INT(10) NOT NULL AUTO_INCREMENT,
    bookTitle VARCHAR(90) NOT NULL,
    bookAuthor VARCHAR(45) NOT NULL,
    yearPublished INT(4) NOT NULL,
    bookGenre VARCHAR(45),
    bookPrice DECIMAL(6,2) NOT NULL,
    bookQuantity INT(10) NOT NULL,
    PRIMARY KEY (bookID)
);

/* Create Customers Table - used to display important information such as customer ID, name, and email. */
CREATE OR REPLACE TABLE Customers (
    customerID INT(10) NOT NULL AUTO_INCREMENT,
    customerName VARCHAR(45) NOT NULL,
    customerEmail VARCHAR(45),
    PRIMARY KEY (customerID)
);

/* Create Employees Table - used to display important information such as employee ID, name, and phone number. */
CREATE OR REPLACE TABLE Employees (
    employeeID INT(10) NOT NULL AUTO_INCREMENT,
    employeeName VARCHAR(45) NOT NULL,
    phoneNumber VARCHAR(20),
    PRIMARY KEY (employeeID)
);

/* Create Sales Table - used to display important sale information such as invoice number, employee and customer IDs involved in the sale, and the revenue generated from the sale. */
CREATE OR REPLACE TABLE Sales (
    invoiceNumber INT(10) NOT NULL AUTO_INCREMENT,
    employeeID INT(10),
    customerID INT(10) NOT NULL,
    saleRevenue DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (invoiceNumber),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE SET NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
);

/* Create Merchandise Sales Intersection Table - used to display intersection table facilitating M:M relationship between Merchandise and Sales entities. */
-- Cascade statements allow deletion from M:M realtionship
CREATE OR REPLACE TABLE MerchandiseSales (
    merchSaleID INT(10) AUTO_INCREMENT NOT NULL,
    merchID INT(10) NOT NULL,
    invoiceNumber INT(10) NOT NULL,
    PRIMARY KEY (merchSaleID),
    CONSTRAINT FK_MerchandiseSales_merchID FOREIGN KEY (merchID) REFERENCES Merchandise(merchID) ON DELETE CASCADE,
    CONSTRAINT FK_MerchandiseSales_invoiceNumber FOREIGN KEY (invoiceNumber) REFERENCES Sales(invoiceNumber) ON DELETE CASCADE
);

/* Create Book Sales Intersection Tale - used to display intersection table facilitating M:M relationship between Books and Sales entities. */
CREATE OR REPLACE TABLE BookSales (
    bookSaleID INT(10) AUTO_INCREMENT NOT NULL,
    bookID INT(10) NOT NULL,
    invoiceNumber INT(10) NOT NULL, 
    PRIMARY KEY (bookSaleID),
    CONSTRAINT FK_BookSales_bookID FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    CONSTRAINT FK_BookSales_invoiceNumber FOREIGN KEY (invoiceNumber) REFERENCES Sales(invoiceNumber) ON DELETE CASCADE
);


/* Insert sample data to show tables layout */

INSERT INTO Merchandise (merchName, merchPrice, merchQuantity)
VALUES ('Floral Bookmark', 1.99, 14),
('Bumblebee Spiral Notebook', 9.99, 8),
('Red Reading Light', 12.30, 10);

INSERT INTO Books (bookTitle, bookAuthor, yearPublished, bookGenre, bookPrice, bookQuantity)
VALUES ('Sapiens', 'Yuval Noah Harari', 2011, 'Non-fiction', 13.06, 7),
('Circe', 'Madeline Miller', 2018, 'Fiction', 22.99, 8),
('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction', 15.49, 6);

INSERT INTO Customers (customerName, customerEmail)
VALUES ('Jack Griffin', jack@gmail.com),
    ('Martha Owen', 'mowen@gmail.com'),
    ('Jennie Mcdaniel', 'jennieM96@yahoo.com');

INSERT INTO Employees (employeeName, phoneNumber)
VALUES ('Amy Jones', '706-715-8865'),
    ('Peter Foster', '404-771-5112'),
    ('Leah Santos', '678-473-3521');

INSERT INTO Sales (employeeID, customerID, saleRevenue)
VALUES (1, 1, 13.06),
    (2, 2, 22.99), 
    (2, 1, 15.49),
    (NULL, 3, 13.06);

INSERT INTO MerchandiseSales (merchID, invoiceNumber)
VALUES (1, 1),
    (3, 1),
    (1, 2);

INSERT INTO BookSales (bookID, invoiceNumber)
VALUES (1, 2),
    (3, 2),
    (1, 3),
    (1, 4);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
