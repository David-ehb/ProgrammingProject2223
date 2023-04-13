//Code voor opzetten van de databank connectie

const mysql = require('mysql2');
const express = require('express');
const app = express();

//To Do: checken hoe login gegevens verstopt kunnen worden.
//1. Environment variables
//2. Encryption modules
//3. Config files met Jason
const pool = mysql.createPool({
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
// query testen
pool.query('SELECT * FROM gebruikers', (err, results, fields) => {
    if (err) {
      console.error('Error bij uitvoeren van query: ' + err.stack);
      return;
    }
    console.log('Query resultaten: ', results);
  });



// Parse JSON
app.use(express.json());

// Afhandelen van login request
app.post('/login', async (req, res) => {
    console.log('login request ontvangen');
  try {
    // Gebruikers input ophalen
    const email = req.body.email;
    //console.log(email);
    const password = req.body.password;
    //console.log(password);

    // Database bevragen voor overeenkomstige login
    const [rows] = await pool.promise().execute(
      'SELECT * FROM gebruikers WHERE email = ? AND wachtwoord = ?',
      [email || null, password || null],
      { types: ['string', 'string'] }
    );

    // Check indien de user bestaat en paswoord correct is
    if (rows.length === 1) {
      // Set cookie en JWT
      req.session.userId = rows[0].id;

      // Sturen naar frontend
      res.json({ success: true });
    } else {
      // Sturen error naar frontend
      res.json({ success: false, message: 'Verkeerde user of paswoord' });
    }
  } catch (error) {
    console.error(error);
    // Sturen error naar frontend
    res.json({ success: false, message: 'An error occurred. Please try again later.' });
  }
});

//console loggen om te checken dat de server luistert
app.listen(3000, () => {
  console.log('Server luistert op poort 3000');
});


