// ./database/db-connector.js
//citation
// Citation for the DB connection: 
// Date 8/11/23 Copied directly from OSU CS 340 nodejs-starter-app, but used our own connection credentials 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '',
    user            : '',
    password        : '',
    database        : ''
})

// Export it for use in our applicaiton
module.exports.pool = pool;
