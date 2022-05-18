const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'node',
    password : 'qwer1234',
    database : 'node',
    port : 3306,
});

connection.connect();

connection.query('SELECT * FROM topic', function (error, results, fields) {
    // if (error) throw error;
    if (error) console.log(error);
    else console.log(results);
    // console.log('The solution is: ', results[0].solution);
});

connection.end();