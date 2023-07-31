-- Audrey Flanders, Jacob Summers
-- Team 29

-------------- Merchandise --------------
-- display merch information
SELECT * FROM Merchandise 

-- add a new merchandise 
INSERT INTO Merchandise (merchName, merchPrice, merchQuantity)
VALUES (:merchName, :merchPrice, :merchQuantity)

-- delete Merchandise (deletion from M:M relationship); they will click the delete button in the table
DELETE FROM Merchandise
WHERE merchID=:merchID


-------------- Books --------------
-- display book information 
SELECT * FROM Books

-- add a new book
INSERT INTO Books (bookTitle, bookAuthor, yearPublished, bookGenre, bookPrice, bookQuantity)
VALUES (:bookTitle, :bookAuthor, :yearPublished, :bookGenre, :bookPrice, :bookQuantity)


-------------- Customers --------------
-- display customer information
SELECT * FROM Customers

-- add a new customer
INSERT INTO Customers (customerName, customerEmail)
VALUES (:customerName, :customerEmail)


-------------- Employees --------------
-- display Employee information
SELECT * FROM Employees

-- add a new employee
INSERT INTO Employees (employeeName, phoneNumber)
VALUES (:employeeName, :phoneNumber)

-- display employee name for dropdown
SELECT employeeName FROM Employees

-- update employee contact information
UPDATE Employees SET phoneNumber = :phoneNumber WHERE
employeeName = :employeeName


-------------- Sales -------------- 
-- show invoice information for all sales
SELECT Sales.invoiceNumber, Employees.employeeName, Customers.customerName, Sales.saleRevenue, GROUP_CONCAT(Books.bookTitle) AS "Books",
GROUP_CONCAT(Merchandise.merchName) AS "Merchandise"
FROM Sales 
LEFT OUTER JOIN Employees ON Sales.employeeID = Employees.employeeID
INNER JOIN Customers ON Sales.customerID = Customers.customerID
LEFT OUTER JOIN BookSales ON Sales.invoiceNumber = BookSales.invoiceNumber
LEFT OUTER JOIN Books ON BookSales.bookID = Books.bookID
LEFT OUTER JOIN MerchandiseSales ON Sales.invoiceNumber = MerchandiseSales.invoiceNumber
LEFT OUTER JOIN Merchandise ON MerchandiseSales.merchID = Merchandise.merchID
group by Sales.invoiceNumber ASC

-- add a new sale 
INSERT INTO Sales (employeeID, customerID, saleRevenue)
VALUES ((SELECT employeeID from Employees WHERE employeeName = :employeeName), 
(SELECT customerID from Customers WHERE customerName = :customerName), :saleRevenue)

-- update sale; CAN SET employeeName to NULL
UPDATE Sales SET employeeID = (SELECT employeeID from Employees WHERE employeeName = :employeeName), 
customerID = (SELECT customerID from Customers WHERE customerName = :customerName), 
saleRevenue = :saleRevenue
WHERE invoiceNumber = :invoiceNumber


-------------- MerchSales --------------
-- get merch information 
SELECT * 
FROM MerchSales

-- functions for updating merch sales
DELETE FROM MerchSales
WHERE invoiceNumber = :invoiceNumber

SELECT * 
FROM MerchSales
WHERE merchID = :merchID and invoiceNumber = :invoiceNumber

UPDATE MerchSales
SET merchID = :merchID, invoiceNumber = :invoiceNumber
WHERE merchID = :merchID and invoiceNumber = :invoiceNumber

-- associate a sale with merchandise
INSERT INTO MerchandiseSales (merchID, invoiceNumber)
VALUES (:merchId, :invoiceNumber)


-------------- BookSales --------------
-- get book information
SELECT * 
FROM BookSales

-- functions for updating book sales
DELETE FROM BookSales
WHERE invoiceNumber = :invoiceNumber

SELECT * 
FROM BookSales
WHERE bookID = :bookID and invoiceNumber = :invoiceNumber

UPDATE BookSales
SET bookID = :bookID, invoiceNumber = :invoiceNumber
WHERE bookID = :bookID and invoiceNumber = :invoiceNumber

-- associate a sale with a book
INSERT INTO BookSales (bookID, invoiceNumber)
VALUES (:bookID, :invoiceNumber)

