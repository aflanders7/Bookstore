// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
const path = require('path');

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(express.static('public'))
PORT        = 8034;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view-engine', '.hbs');

const { query } = require('express');


/*
    ROUTES
*/
app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.merchName === undefined)
    {
        query1 = "SELECT * FROM Merchandise;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Merchandise WHERE merchName LIKE "${req.query.merchName}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Merchandise;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let Merchandise = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let Merch = rows;  //NOT SURE HOW TO IMPLEMENT THIS YET, NOT YET CORRECT

            return res.render('index', {data: Merchandise, Merch: Merch});
        })
    })
});                        // requesting the web site.
// app.js

app.get('/books', function (req, res,html) {
    res.sendFile(path.join(__dirname+'/views/books.html'));
   });

app.get('/booksales', function (req, res,html) {
    res.sendFile(path.join(__dirname+'/views/booksales.html'));
   });

app.get('/customers', function (req, res,html) {
    res.sendFile(path.join(__dirname+'/views/customers.html'));
   });

app.get('/employees', function (req, res,html) {
    res.sendFile(path.join(__dirname+'/views/employees.html'));
   });

app.get('/merchandise', function (req, res,html) {
    res.sendFile(path.join(__dirname+'/views/merchandise.html'));
   });

app.get('/merchandisesales', function (req, res,html) {
    res.sendFile(path.join(__dirname+'/views/merchandisesales.html'));
   });

app.get('/sales', function (req, res,html) {
    res.sendFile(path.join(__dirname+'/views/sales.html'));
   });



app.post('/add-merch-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let merchName = parseInt(data['input-merchName']);
    if (isNaN(merchName))
    {
        merchName = 'NULL'
    }

    let merchPrice = parseInt(data['input-merchPrice']);
    if (isNaN(merchPrice))
    {
        merchPrice = 'NULL'
    }

    let merchQuantity = parseInt(data['input-merchQuantity']);
    // Create the query and run it on the database
    query1 = `INSERT INTO Merchandise (merchName, merchPrice, merchQuantity) VALUES ('${data['input-merchName']}', '${data['input-merchPrice']}', '${data['input-merchQuantity']}' ${merchName}, ${merchPrice}, ${merchQuantity})`;
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
            res.redirect('/');
        }
    })
})
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

