const mysql = require('mysql2');

let pool = mysql.createPool({
    host: 'dt5.ehb.be',
    port: '3306',
    user: '2223PROGPROJGR1',
    password: 'NsEo8m',
    database: '2223PROGPROJGR1'
});

// connect naar de database
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error bij connecteren naar database: ' + err.stack);
      return;
    }
    //console loggen om te kijken of connectie gebeurt
    console.log('Geconnecteerd naar db met id ' + connection.threadId);
  });

module.exports = pool;
