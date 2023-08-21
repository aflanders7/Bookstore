
// Get an instance of mysql to use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : '',
    password        : '',
    database        : ''
})

// Export it for use in our applicaiton
module.exports.pool = pool;
