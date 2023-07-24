-- Audrey Flanders, Jacob Summers
-- Team 29

-------------- Merchandise --------------
-- display merch information
SELECT merchName, merchPrice, merchQuantity FROM Merchandise 

-- add a new merchandise 
INSERT INTO Merchandise (merchName, merchPrice, merchQuantity)
VALUES (:merchName, :merchPrice, :merchQuantity)

-- update the merch information
UPDATE Merchandise SET merchName=:merchName, merchPrice:merchPrice, merchQuantity:merchQuantity WHERE merchID = :merchID

-- delete Merchandise (deletion from M:M relationship)
DELETE FROM Merchandise
WHERE merchName=:merchName


-------------- Books --------------
-- display book information 
SELECT bookTitle, bookAuthor, yearPublished, bookGenre, bookPrice, bookQuantity FROM Books

-- add a new book
INSERT INTO Books (bookTitle, bookAuthor, yearPublished, bookGenre, bookPrice, bookQuantity)
VALUES (:bookTitle, :bookAuthor, :yearPublished, :bookGenre, :bookPrice, :bookQuantity)

-- update the book information
UPDATE Books SET bookTitle=:bookTitle, bookAuthor=:bookAuthor, yearPublished=:yearPublished, bookGenre=:bookGenre, bookPrice=:bookPrice, bookQuantity=bookQuantity  WHERE bookID = :bookID


-------------- Customers --------------
-- display customer information
SELECT customerName, customerEmail FROM Customers

-- add a new customer
INSERT INTO Customers (customerName, customerEmail)
VALUES (:customerName, :customerEmail)


-------------- Employees --------------
-- display Employee information
SELECT employeeName, phoneNumber FROM Employees

-- add a new employee
INSERT INTO Employees (employeeName, phoneNumber)
VALUES (:employeeName, :phoneNumber)

--Update employee information
UPDATE Employees SET employeeName=:employeeName, phoneNumber=:phoneNumber

-- delete employee
DELETE FROM Employees WHERE employeeName = :employeeName


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
group by Sales.invoiceNumber

-- add a new sale 
INSERT INTO Sales (employeeID, customerID, saleRevenue)
VALUES (:employeeID, :customerID, :saleRevenue)

-- you cannot delete a sale

-------------- MerchSales --------------
-- get information to update merch sales
SELECT * 
FROM MerchSales
WHERE merchID = :merchID and invoiceNumber = :invoiceNumber

UPDATE MerchSales
SET merchID = :merchID, invoiceNumber = :invoiceNumber
WHERE merchID = :merchID and invoiceNumber = :invoiceNumber

-- add a merch sale
INSERT INTO MerchandiseSales (merchID, invoiceNumber)
VALUES (:merchId, :invoiceNumber)

-- -- delete MerchSales
-- DELETE FROM MerchSales
-- WHERE merchID = :merchID and invoiceNumber = :invoiceNumber


-------------- BookSales --------------
-- get information to update book sales
SELECT * 
FROM BookSales
WHERE bookID = :bookID and invoiceNumber = :invoiceNumber

UPDATE BookSales
SET bookID = :bookID, invoiceNumber = :invoiceNumber
WHERE bookID = :bookID and invoiceNumber = :invoiceNumber

-- add a book sale
INSERT INTO BookSales (bookID, invoiceNumber)
VALUES (:bookID, :invoiceNumber)

-- -- delete BookSales
-- DELETE FROM MerchSales
-- WHERE bookID = :bookID and invoiceNumber = :invoiceNumber