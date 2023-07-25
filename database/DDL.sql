/* 

Audrey Flanders, Jacob Summers
Team 29

*/

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
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
);

/* Create Merchandise Sales Intersection Table - used to display intersection table facilitating M:M relationship between Merchandise and Sales entities. */
CREATE OR REPLACE TABLE MerchandiseSales (
    merchSaleID INT(10) AUTO_INCREMENT NOT NULL,
    merchID INT(10) NOT NULL,
    invoiceNumber INT(10) NOT NULL,
    PRIMARY KEY (merchSaleID),
    CONSTRAINT FK_MerchandiseSales_merchID FOREIGN KEY (merchID) REFERENCES Merchandise(merchID),
    CONSTRAINT FK_MerchandiseSales_invoiceNumber FOREIGN KEY (invoiceNumber) REFERENCES Sales(invoiceNumber)
);

/* Create Book Sales Intersection Tale - used to display intersection table facilitating M:M relationship between Books and Sales entities. */
CREATE OR REPLACE TABLE BookSales (
    bookSaleID INT(10) AUTO_INCREMENT NOT NULL,
    bookID INT(10) NOT NULL,
    invoiceNumber INT(10) NOT NULL, 
    PRIMARY KEY (bookSaleID),
    CONSTRAINT FK_BookSales_bookID FOREIGN KEY (bookID) REFERENCES Books(bookID),
    CONSTRAINT FK_BookSales_invoiceNumber FOREIGN KEY (invoiceNumber) REFERENCES Sales(invoiceNumber)
);


/* Insert sample data to show tables layout */

INSERT INTO Merchandise (merchName, merchPrice, merchQuantity)
VALUES ('Floral Bookmark', 1.99, 14),
('Bumblebee Spiral Notebook', 9.99, 8),
('Red Reading Light', 12.30, 10);

INSERT INTO Books (bookTitle, bookAuthor, yearPublished, bookGenre, bookPrice, bookQuantity)
VALUES ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 2011, 'Non-fiction', 13.06, 7),
('Circe', 'Madeline Miller', 2018, 'Fiction', 22.99, 8),
('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction', 15.49, 6);

INSERT INTO Customers (customerName, customerEmail)
VALUES ('Jack Griffin', NULL),
    ('Martha Owen', 'mowen@gmail.com'),
    ('Jennie Mcdaniel', 'jennieM96@yahoo.com');

INSERT INTO Employees (employeeName, phoneNumber)
VALUES ('Amy Jones', '706-715-8865'),
    ('Peter Foster', '404-771-5112'),
    ('Leah Santos', '678-473-3521');

INSERT INTO Sales (employeeID, customerID, saleRevenue)
VALUES (1, 1, 14.29),
    (2, 2, 30.54), 
    (2, 1, 13.06),
    (NULL, 3, 26.12);

INSERT INTO MerchandiseSales (merchID, invoiceNumber)
VALUES (1, 1),
    (3, 1),
    (1, 2);

INSERT INTO BookSales (bookID, invoiceNumber)
VALUES (1, 2),
    (3, 2),
    (1, 3),
    (1, 4),
    (1,4);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
