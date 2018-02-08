var mysql      = require('mysql');

var con = mysql.createPool({
    connectionLimit :process.env.numberofconnections,
    host     : process.env.host,
    port	 : process.env.port,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
})

module.exports = con 