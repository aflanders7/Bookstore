// citations

// Citation for the code setup and listener:
// Date 8/11/23
// Copied from OSU CS 340 nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Citation for the read and search operations:
// Date 8/11/23
// Adapted from OSU CS 340 nodejs-starter-app step 4 and step 6, queries are entirely our own work
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

// Citation for the add operations:
// Date 8/11/23
// Adapted from OSU CS 340 nodejs-starter-app step 5, queries are entirely our own work
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Citation for the delete operations:
// Date 8/11/23
// Adapted from OSU CS 340 nodejs-starter-app step 6, queries are entirely our own work
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

// Citation for the update operations:
// Date 8/11/23
// Adapted from OSU CS 340 nodejs-starter-app step 8, queries are entirely our own work
// Update functions were modified based on the add function post requests
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data




// App.js

/*
    SETUP
*/
const path = require('path');
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 8034;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector');

// app.js

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
const { query } = require('express');

/*
    ROUTES
*/


// app.js

////////////// Read Operations

app.get('/', function(req, res)
{
    let query1 = "SELECT * FROM Merchandise;";
    db.pool.query(query1, function(error, rows, fields){
    res.render('index', {data: rows});
    })
});                                    // will process this file, before sending the finished HTML to the client.


app.get('/books', function (req, res) {
        let query2 = "SELECT * FROM Books;";
        db.pool.query(query2, function(error, rows, fields){
        res.render('books', {data: rows});
        })
    });  

app.get('/booksales', function (req, res) {
    let query1 = "SELECT BookSales.bookSaleID, Books.bookTitle, BookSales.invoiceNumber FROM BookSales JOIN Books ON Books.bookID = BookSales.bookID group by BookSales.bookSaleID ASC;";
    let query2 = "SELECT * FROM Books;";
    let query3 = "SELECT * FROM Sales;";
    db.pool.query(query1, function(error, rows, fields){
        let booksales = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            let Books = rows;

            db.pool.query(query3, (error, rows, fields) => {   

                let Sales = rows;        
                return res.render('booksales', {data: booksales, Books: Books, Sales: Sales});
        }) 
    })
})
});

app.get('/customers', function (req, res) {
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.inputcustomerName === undefined)
    {
        query1 = "SELECT * FROM Customers;";
    }
 
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Customers WHERE customerName LIKE "${req.query.inputcustomerName}%"`
 
    }
        db.pool.query(query1, function(error, rows, fields){    // Execute the query
 
            res.render('customers', {data: rows});                  
        })                                                      
});


app.get('/employees', function (req, res,html) {
    let query5 = "SELECT * FROM Employees;";
    db.pool.query(query5, function(error, rows, fields){
    res.render('employees', {data: rows});
    })
});

   

app.get('/merchandise', function(req, res) {  
    let query5 = "SELECT * FROM Merchandise;";
    db.pool.query(query5, function(error, rows, fields){
    res.render('merchandise', {data: rows});
    })
});


app.get('/merchandisesales', function (req, res) {
    let query1 = "SELECT MerchandiseSales.merchSaleID, Merchandise.merchName, MerchandiseSales.invoiceNumber FROM MerchandiseSales JOIN Merchandise ON Merchandise.merchID = MerchandiseSales.merchID group by MerchandiseSales.merchSaleID ASC;";
    let query2 = "SELECT * FROM Merchandise;";
    let query3 = "SELECT * FROM Sales;";
    db.pool.query(query1, function(error, rows, fields){
        let merchsales = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            let Merch = rows;

            db.pool.query(query3, (error, rows, fields) => {   

                let Sales = rows;        
                return res.render('merchandisesales', {data: merchsales, Merch: Merch, Sales: Sales});
        }) 
    })
})
}); 

app.get('/sales', function (req, res) {
    let query1 = "SELECT Sales.invoiceNumber, Employees.employeeName, Customers.customerName, Sales.saleRevenue, GROUP_CONCAT(DISTINCT Books.bookTitle SEPARATOR ', ') AS 'Books', GROUP_CONCAT(DISTINCT Merchandise.merchName SEPARATOR ', ') AS 'Merchandise' FROM Sales LEFT JOIN Employees ON Sales.employeeID = Employees.employeeID JOIN Customers ON Sales.customerID = Customers.customerID LEFT JOIN BookSales ON Sales.invoiceNumber = BookSales.invoiceNumber LEFT JOIN Books ON BookSales.bookID = Books.bookID LEFT JOIN MerchandiseSales ON Sales.invoiceNumber = MerchandiseSales.invoiceNumber LEFT JOIN Merchandise ON MerchandiseSales.merchID = Merchandise.merchID group by Sales.invoiceNumber ASC;";
    let query2 = "SELECT * FROM Employees;";
    let query3 = "SELECT * FROM Customers;";
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the sale
        let sales = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the Employees
            let Employees = rows;

            db.pool.query(query3, (error, rows, fields) => {   

                let Customers = rows;        
                return res.render('sales', {data: sales, Employees: Employees, Customers: Customers});
        }) 
    })
})
});

app.get('/schema', function(req, res)
{
    let query1 = "SELECT * FROM Merchandise;";
    db.pool.query(query1, function(error, rows, fields){
    res.render('schema', {data: rows});
    })
}); 


////////////// Add Operations

app.post('/add-merch-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values- no null values

    let merchQuantity = parseInt(data['input-merchQuantity']);
    // Create the query and run it on the database
    query1 = `INSERT INTO Merchandise (merchName, merchPrice, merchQuantity) VALUES ('${data['input-merchName']}', '${data['input-merchPrice']}', '${data['input-merchQuantity']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/merchandise');
        }
    })
});


app.post('/add-book-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values- no null values

    // Create the query and run it on the database
    query1 = `INSERT INTO Books (bookTitle, bookAuthor, yearPublished, bookGenre, bookPrice, bookQuantity) VALUES ('${data['input-bookTitle']}', '${data['input-bookAuthor']}', '${data['input-bookYear']}', '${data['input-bookGenre']}', '${data['input-bookPrice']}', '${data['input-bookQuantity']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/books');
        }
    })
});

app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let email = parseInt(data['input-customerEmail']);
    if (isNaN(email))
    {
        email = 'NULL';
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customerName, customerEmail) VALUES ('${data['input-customerName']}', ${email})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/customers');
        }
    })
});

app.post('/add-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values- no null values

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (employeeName, phoneNumber) VALUES ('${data['input-employeeName']}', '${data['input-phoneNumber']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/employees');
        }
    })
});

app.post('/add-sale-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    let employee = parseInt(data['input-employee']);
    if (isNaN(employee))
    {
        employee = 'NULL';
    }

    
    // Create the query and run it on the database
    query1 = `INSERT INTO Sales (employeeID, customerID, saleRevenue) VALUES (${employee}, '${data['input-customer']}', '${data['input-saleRevenue']}')`;
   

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            
                    res.redirect('/sales');
                }
            });
        
    });


app.post('/add-book-sale-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO BookSales (bookID, invoiceNumber) VALUES  ('${data['input-book']}', '${data['input-invoiceNumber']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/booksales');
        }
    })
});

app.post('/add-merch-sale-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO MerchandiseSales (merchID, invoiceNumber) VALUES  ('${data['input-merch']}', '${data['input-invoiceNumber']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/merchandisesales');
        }
    })
});

////////////// Update Operations

app.post('/update-merch', function(req,res){
    let data = req.body;

    let inputmerchQuantity = parseInt(data['input-merchQuantity']);
  
    let queryUpdateMerch = `UPDATE Merchandise SET merchName = '${data['input-merchName']}', merchPrice = '${data['input-merchPrice']}', merchQuantity = '${inputmerchQuantity}' WHERE merchID = ${data['input-merchID']}`;

    // Run the query on the database
    db.pool.query(queryUpdateMerch, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/merchandise');
        }
    })
});


app.post('/update-book', function(req,res){
    let data = req.body;

    let inputbookQuantity = parseInt(data['input-bookQuantity']);
  
    let queryUpdateBook = `UPDATE Books SET bookPrice = '${data['input-bookPrice']}', bookQuantity = '${inputbookQuantity}' WHERE bookID = ${data['input-bookID']}`;

    // Run the query on the database
    db.pool.query(queryUpdateBook, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/books');
        }
    })
});

app.post('/update-sale', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    let employee = parseInt(data['input-employee']);
    if (isNaN(employee))
    {
        employee = 'NULL'
    }

    // Create the query and run it on the database
    let query1 = `UPDATE Sales SET employeeID = ${employee}, customerID = '${data['input-customer']}', saleRevenue = '${data['input-saleRevenue']}' WHERE invoiceNumber = ${data['input-invoiceNumber']}`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/sales');
        }
    })
});

app.post('/update-merch-sale', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values- none


    // Create the query and run it on the database
    let query1 = `UPDATE MerchandiseSales SET merchID = '${data['input-merch']}', invoiceNumber = '${data['input-invoiceNumber']}' WHERE merchSaleID = ${data['input-merchSale']}`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/merchandisesales');
        }
    })
});

app.post('/update-book-sale', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values- none


    // Create the query and run it on the database
    let query1 = `UPDATE BookSales SET bookID = '${data['input-book']}', invoiceNumber = '${data['input-invoiceNumber']}' WHERE bookSaleID = ${data['input-bookSale']}`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/booksales');
        }
    })
});

////////////// Delete Operations

app.delete('/delete-merchandise-ajax/', function(req,res,next){
    let data = req.body;
    let merchID = parseInt(data.merchID);
    let deleteMerchSales = `DELETE FROM MerchandiseSales WHERE merchID = ?`;
    let deleteMerch= `DELETE FROM Merchandise WHERE merchID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteMerchSales, [merchID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteMerch, [merchID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

app.delete('/delete-merchandise-sale-ajax/', function(req,res,next){
    let data = req.body;
    let merchSaleID = parseInt(data.merchSaleID);
    let deleteMerchSales = `DELETE FROM MerchandiseSales WHERE merchSaleID = ?`;
    //let deleteMerch= `DELETE FROM Merchandise WHERE merchID = ?`; - should not delete merchandise when deleting a sale
  
  
          // Run the 1st query
          db.pool.query(deleteMerchSales, [merchSaleID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }

  })});

app.delete('/delete-book-sale-ajax/', function(req,res,next){
    let data = req.body;
    let bookSaleID = parseInt(data.bookSaleID);
    let deleteBookSales = `DELETE FROM BookSales WHERE bookSaleID = ?`;
    //let deleteBook= `DELETE FROM Merchandise WHERE merchID = ?`; - should not delete book when deleting a sale
  
  
          // Run the 1st query
          db.pool.query(deleteBookSales, [bookSaleID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }


  })});

  app.delete('/delete-book-ajax/', function(req,res,next){
    let data = req.body;
    let bookID = parseInt(data.bookID);
    let deleteBookSales = `DELETE FROM BookSales WHERE bookID = ?`;
    let deleteBook = `DELETE FROM Books WHERE bookID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteBookSales, [bookID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteBook, [bookID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
})});

app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.employeeID);
    let deleteEmployee = `DELETE FROM Employees WHERE employeeID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteEmployee, [employeeID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }

  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});





