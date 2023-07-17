SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Merchandise (
    merchID INT(10) NOT NULL AUTO_INCREMENT,
    merchName VARCHAR(45) NOT NULL,
    merchPrice DECIMAL(6,2) NOT NULL,
    merchQuantity INT(10) NOT NULL,
    PRIMARY KEY (merchID)
);

INSERT INTO Merchandise (merchName, merchPrice, merchQuantity)
VALUES ('Floral Bookmark', 1.99, 14),
('Bumblebee Spiral Notebook', 9.99, 8),
('Red Reading Light', 12.30, 10);

CREATE OR REPLACE TABLE Books (
    bookID INT(10) NOT NULL AUTO_INCREMENT,
    bookTitle VARCHAR(90) NOT NULL,
    bookAuthor VARCHAR(45) NOT NULL,
    yearPublished INT(4) NOT NULL,
    bookPrice DECIMAL(6,2) NOT NULL,
    bookQuantity INT(10) NOT NULL,
    PRIMARY KEY (bookID)
);

INSERT INTO Books (bookTitle, bookAuthor, yearPublished, bookPrice, bookQuantity)
VALUES ('Carrie Soto is Back', 'Taylor Jenkins Reid', 2017, 15.99, 5),
('The Last Rose of Shanghai', 'Weina Dai Randel', 2015, 12.99, 3),
('Where the Crawdads Sing', 'Delia Owens', 2016, 9.99, 10);

CREATE OR REPLACE TABLE Customers (
    customerID INT(10) NOT NULL AUTO_INCREMENT,
    customerName VARCHAR(45) NOT NULL,
    customerEmail VARCHAR(45),
    PRIMARY KEY (customerID)
);

INSERT INTO Customers (customerName, customerEmail)
VALUES ('Jacob Summers', 'jsummers@gmail.com'),
    ('Audrey Flanders', 'aflanders@gmail.com'),
    ('Josh Nunnery', 'jnunnery@gmail.com');

CREATE OR REPLACE TABLE Employees (
    employeeID INT(10) NOT NULL AUTO_INCREMENT,
    employeeName VARCHAR(45) NOT NULL,
    phoneNumber VARCHAR(20),
    PRIMARY KEY (employeeID)
);

INSERT INTO Employees (employeeName, phoneNumber)
VALUES ('John Smith', '123-456-7778'),
    ('Jane Doe', '555-555-5555'),
    ('Jenny Lee', '917-345-1859');

CREATE OR REPLACE TABLE Sales (
    invoiceNumber INT(10) NOT NULL AUTO_INCREMENT,
    employeeID INT(10) NOT NULL,
    customerID INT(10),
    saleRevenue DECIMAL(6,2),
    PRIMARY KEY (invoiceNumber),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
);

INSERT INTO Sales (employeeID, customerID, saleRevenue)
VALUES (1, 1, 9.99),
    (1, 2, 12.99), 
    (3, 3, 16.99);

CREATE OR REPLACE TABLE MerchandiseSales (
    merchandiseMerchID INT(10) NOT NULL,
    saleInvoiceNumber INT(10) NOT NULL,
    merchSaleQuantity INT(10),
    FOREIGN KEY (merchandiseMerchID) REFERENCES Merchandise(merchID),
    FOREIGN KEY (saleInvoiceNumber) REFERENCES Sales(invoiceNumber)
);

INSERT INTO MerchandiseSales (merchandiseMerchID, saleInvoiceNumber, merchSaleQuantity)
VALUES (2, 1, 1),
    (1, 2, 1),
    (1, 3, 1);
    
CREATE OR REPLACE TABLE BookSales (
    saleInvoiceNumber INT(10), 
    bookSaleQuantity INT(10),
    bookID INT(10),
    FOREIGN KEY (bookID) REFERENCES Books(bookID),
    FOREIGN KEY (saleInvoiceNumber) REFERENCES Sales(invoiceNumber)
);
INSERT INTO BookSales (saleInvoiceNumber, bookSaleQuantity, bookID)
VALUES (1, 1, 1),
    (2, 1, 2),
    (3, 1, 3);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
