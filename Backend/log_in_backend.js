'use strict';

//Code voor opzetten van de databank connectie
const pool = require('./db/db_connection.js');
const gebruikerModel = require('./models/gebruiker_model.js');

const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();

// Allow CORS
app.use(cors({
  origin: '*'
}));

// Parse JSON
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true, parameterLimit: 100000000000 }));
app.use(express.json());

// Afhandelen van login request
app.post('/login', async (req, res) => {
  console.log('login request ontvangen');
  try {
    // Gebruikers input ophalen
    const email = req.body.email;
    console.log(req.body);
    const password = req.body.password;
    console.log(password);

    // Database bevragen voor overeenkomstige login
    const [rows] = await pool.promise().execute(
      'SELECT * FROM gebruikers WHERE (email = ? AND wachtwoord = ?)',
      [email || null, password || null]
    );

    // Check indien de user bestaat en paswoord correct is
    if (rows.length === 1) {
      // Set cookie en JWT
      //req.session.userId = rows[0].id;

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

// Geeft alle gebruikers terug
app.get('/gebruikers', async (req, res) => {
  try {
    let gebruikers = await gebruikerModel.get_all()
    res.json(gebruikers)
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error })
  }
});

// Check of email al bestaat
app.get('/emails/:email', async (req, res) => {
  try {
    let bestaat_email = await gebruikerModel.bestaat_email(req.params.email)
    res.json(bestaat_email)
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error })
  }
});

// Maakt een nieuwe gebruiker aan
app.post('/registreer', async (req, res) => {
  let is_gebruiker_aangemaakt = await gebruikerModel.create_nieuwe_gebruiker(req.body.email, req.body.wachtwoord)
  try {
    console.log("Registreer resultaat: " + is_gebruiker_aangemaakt);
    if (is_gebruiker_aangemaakt) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Email bestaat al' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error })
  }
});
;

//console loggen om te checken dat de server luistert
app.listen(3000, () => {
  console.log('Server luistert op poort 3000');
});