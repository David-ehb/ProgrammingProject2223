//Code voor opzetten van de databank connectie
'use strict';
const mysql = require('mysql2');

//To Do: checken hoe login gegevens verstopt kunnen worden.
//1. Environment variables
//2. Encryption modules
//3. Config files met Jason
const connection = mysql.createConnection({
  host: 'dt5.ehb.be',
  port: '3306',
  user: '2223PROGPROJGR1',
  password: 'NsEo8m',
  database: '2223PROGPROJGR1'
});

// connect naar de database
connection.connect((err) => {
  if (err) {
    console.error('Error bij connecteren naar database: ' + err.stack);
    return;
  }
  //console loggen om te kijken of connectie gebeurt
  console.log('Geconnecteerd naar db met id ' + connection.threadId);
});
// query testen
connection.query('SELECT * FROM deelnemers', (err, results, fields) => {
    if (err) {
      console.error('Error bij uitvoeren van query: ' + err.stack);
      return;
    }
    console.log('Query resultaten: ', results);
  });

const express = require('express');
const app = express();

// Parse JSON
app.use(express.json());

// Afhandelen van login request
app.post('/login', async (req, res) => {
  try {
    // Gebruikers input ophalen
    const username = req.body.username;
    const password = req.body.password;

    // Database bevragen voor overeenkomstige login
    const [rows] = await pool.execute(
      'SELECT * FROM deelnemers WHERE (username = ?) AND password = ?',
      [username, password]
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


