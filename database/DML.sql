------------- Merchandise --------------
-- display merch information
SELECT * FROM Merchandise 


-- add a new merchandise 
INSERT INTO Merchandise (merchName, merchPrice, merchQuantity)
VALUES (:input-merchName, :input-merchPrice, :input-merchQuantity)

-- delete Merchandise (deletion from M:M relationship); also delete from intersection table
DELETE FROM Merchandise
WHERE merchID=:merchID

DELETE FROM MerchandiseSales 
WHERE merchID =:merchID

-- update merchandise
UPDATE Merchandise SET merchName = :input-merchName, merchPrice = :input-merchPrice, merchQuantity = :inputmerchQuantity 
WHERE merchID = :input-merchID



-------------- Books --------------
-- display book information 
SELECT * FROM Books

-- add a new book
INSERT INTO Books (bookTitle, bookAuthor, yearPublished, bookGenre, bookPrice, bookQuantity)
VALUES (:input-bookTitle, :input-bookAuthor, :input-bookYear, :input-bookGenre, :input-bookPrice, :input-bookQuantity)

-- update books
UPDATE Books SET bookPrice = :input-bookPrice, bookQuantity = :inputbookQuantity 
WHERE bookID = :input-bookID


-------------- Customers --------------
-- display customer information
SELECT * FROM Customers

-- display customer search information
SELECT * FROM Customers WHERE customerName LIKE :inputcustomerName

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
