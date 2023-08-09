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
    let query3 = "SELECT BookSales.bookSaleID, Books.bookTitle, BookSales.invoiceNumber FROM BookSales JOIN Books ON Books.bookID = BookSales.bookID;";
    db.pool.query(query3, function(error, rows, fields){
    res.render('booksales', {data: rows});
    })
});  

app.get('/customers', function (req, res) {
    let query4 = "SELECT * FROM Customers;";
    db.pool.query(query4, function(error, rows, fields){
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
   // Declare Query 
   let query1;

   // If there is no query string, we just perform a basic SELECT
   if (req.query.inputmerchName === undefined)
   {
       query1 = "SELECT * FROM Merchandise;";
   }

   // If there is a query string, we assume this is a search, and return desired results
   else
   {
       query1 = `SELECT * FROM Merchandise WHERE merchName LIKE "${req.query.inputmerchName}%"`

   }
       db.pool.query(query1, function(error, rows, fields){    // Execute the query

           res.render('merchandise', {data: rows});                  
       })                                                      
   });


app.get('/merchandisesales', function (req, res) {
    let query1 = "SELECT MerchandiseSales.merchSaleID, Merchandise.merchName, MerchandiseSales.invoiceNumber FROM MerchandiseSales JOIN Merchandise ON Merchandise.merchID = MerchandiseSales.merchID;";
    db.pool.query(query1, function(error, rows, fields){
    res.render('merchandisesales', {data: rows});
    })
});  

app.get('/sales', function (req, res) {
    let query1 = "SELECT Sales.invoiceNumber, Employees.employeeName, Customers.customerName, Sales.saleRevenue, GROUP_CONCAT(Books.bookTitle) AS 'Books', GROUP_CONCAT(Merchandise.merchName) AS 'Merchandise' FROM Sales LEFT JOIN Employees ON Sales.employeeID = Employees.employeeID JOIN Customers ON Sales.customerID = Customers.customerID LEFT JOIN BookSales ON Sales.invoiceNumber = BookSales.invoiceNumber LEFT JOIN Books ON BookSales.bookID = Books.bookID LEFT JOIN MerchandiseSales ON Sales.invoiceNumber = MerchandiseSales.invoiceNumber LEFT JOIN Merchandise ON MerchandiseSales.merchID = Merchandise.merchID group by Sales.invoiceNumber ASC;";
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

    // Capture NULL values- no null values

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customerName, customerEmail) VALUES ('${data['input-customerName']}', '${data['input-customerEmail']}')`;
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
        employee = 'NULL'
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
            return res.status(400).send(error.sqlMessage);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/merchandise');
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

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});





