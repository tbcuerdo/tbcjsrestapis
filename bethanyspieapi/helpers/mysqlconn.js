const mysql = require('mysql');

const exec = (sql, resolve, reject, ...values) => {
    let connection = mysql.createConnection({
        host     : '172.17.0.2',
        user     : 'root',
        password : 'my-secret-pw',
        database : 'bethany'
      });
       
      connection.connect();

      connection.query(sql, values, function (error, results, fields) {
        if (error) reject(error);
        resolve(results);
      });
      

      connection.end();
};

mysqlconn = {
    exec: exec
};

module.exports = mysqlconn;