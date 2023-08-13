-- Audrey Flanders, Jacob Summers
-- Team 29

--citations

--Citation for the DML queries:
--Date: 7/24/23
--Adapted from OSU CS 340 JOINS and queries lecture notes, but the table and attribute names and join statement details are our own work
-- URL: https://canvas.oregonstate.edu/courses/1922991/pages/exploration-sql-joins?module_item_id=23329605
-- URL: https://canvas.oregonstate.edu/courses/1922991/pages/activity-5-sql-queries-of-multiple-tables-joins?module_item_id=23329609

--Citation for cascade statements:
--Date: 7/24/23
--Adapted from OSU CS 340 Cascade module, but the statment locations are our own work
--URL: https://canvas.oregonstate.edu/courses/1922991/pages/exploration-mysql-cascade?module_item_id=23329617

--Citation for group concat select statement
--Date: 7/24/23
--Adapted from W3Resource, the values are our own work
--URL: https://www.w3resource.com/mysql/aggregate-functions-and-grouping/aggregate-functions-and-grouping-group_concat.php


-------------- Merchandise --------------
-- display merch information
SELECT * FROM Merchandise 

-- display merch search information
SELECT * FROM Merchandise WHERE merchName LIKE :inputmerchName

-- add a new merchandise 
INSERT INTO Merchandise (merchName, merchPrice, merchQuantity)
VALUES (:input-merchName, :input-merchPrice, :input-merchQuantity)

-- delete Merchandise (deletion from M:M relationship); also delete from intersection table
DELETE FROM Merchandise
WHERE merchID=:merchID

DELETE FROM MerchandiseSales 
WHERE merchID =:merchID


-------------- Books --------------
-- display book information 
SELECT * FROM Books

-- add a new book
INSERT INTO Books (bookTitle, bookAuthor, yearPublished, bookGenre, bookPrice, bookQuantity)
VALUES (:input-bookTitle, :input-bookAuthor, :input-bookYear, :input-bookGenre, :input-bookPrice, :input-bookQuantity)


-------------- Customers --------------
-- display customer information
SELECT * FROM Customers

-- add a new customer
INSERT INTO Customers (customerName, customerEmail)
VALUES (:input-customerName, :input-customerEmail)


-------------- Employees --------------
-- display Employee information
SELECT * FROM Employees

-- add a new employee
INSERT INTO Employees (employeeName, phoneNumber)
VALUES (:input-employeeName, :input-phoneNumber)


-------------- Sales -------------- 
-- show invoice information for all sales
SELECT Sales.invoiceNumber, Employees.employeeName, Customers.customerName, Sales.saleRevenue, GROUP_CONCAT(Books.bookTitle) AS "Books",
GROUP_CONCAT(Merchandise.merchName) AS "Merchandise"
FROM Sales 
LEFT JOIN Employees ON Sales.employeeID = Employees.employeeID
JOIN Customers ON Sales.customerID = Customers.customerID
LEFT JOIN BookSales ON Sales.invoiceNumber = BookSales.invoiceNumber
LEFT JOIN Books ON BookSales.bookID = Books.bookID
LEFT JOIN MerchandiseSales ON Sales.invoiceNumber = MerchandiseSales.invoiceNumber
LEFT JOIN Merchandise ON MerchandiseSales.merchID = Merchandise.merchID
group by Sales.invoiceNumber ASC

-- allow for employee and customers FK dropdown
SELECT * FROM Employees

SELECT * FROM Customers

-- add a new sale 
INSERT INTO Sales (employeeID, customerID, saleRevenue)
VALUES (:input-employee, 
:input-customer, :input-saleRevenue)

-- update sale; CAN SET employee to NULL
UPDATE Sales SET employeeID = :input-employee, customerID = :input-customer, saleRevenue = :input-saleRevenue
WHERE invoiceNumber = :input-invoiceNumber


-------------- MerchSales --------------
-- get merch information 
SELECT MerchandiseSales.merchSaleID, Merchandise.merchName, MerchandiseSales.invoiceNumber FROM MerchandiseSales JOIN Merchandise ON Merchandise.merchID = MerchandiseSales.merchID group by MerchandiseSales.merchSaleID ASC

--allow for Merchandise and Sales FK dropdown
SELECT * FROM Merchandise

SELECT * FROM Sales

-- associate a sale with merchandise
INSERT INTO MerchandiseSales (merchID, invoiceNumber)
VALUES (:input-merch, :input-invoiceNumber)

-- function for updating merch sales
UPDATE MerchandiseSales
SET merchID = :input-merch, invoiceNumber = :input-invoiceNumber
WHERE merchSaleID = :input-merchSale

-- delete a merch sale
DELETE FROM MerchandiseSales WHERE merchSaleID = :merchSaleID


-------------- BookSales --------------
-- get book information
SELECT BookSales.bookSaleID, Books.bookTitle, BookSales.invoiceNumber FROM BookSales JOIN Books ON Books.bookID = BookSales.bookID group by BookSales.bookSaleID ASC

--allow for Books and Sales FK dropdown
SELECT * FROM Books

SELECT * FROM Sales

-- associate a sale with a book
INSERT INTO BookSales (bookID, invoiceNumber)
VALUES (:input-book, :input-invoiceNumber)

-- functions for updating book sales
UPDATE BookSales
SET bookID = :input-book, invoiceNumber = :input-invoiceNumber
WHERE bookSaleID = :input-bookSale

-- delete a book sale
DELETE FROM BookSales WHERE bookSaleID = :bookSaleID
