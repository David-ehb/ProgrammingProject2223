'use strict'
import express from 'express';
import session from 'express-session';
import { createConnection, escape } from 'mysql';

const app = express();

// Set up session middleware
app.use(session({
  secret: 'RandomStringDieWeGeheimMoetenHouden',
  resave: false,
  saveUninitialized: true
}));

// Create connection to database
const connection = createConnection({
  host: 'localhost',
  user: '2223PROGPROJGR1',
  password: 'NsEo8m',
  database: '2223PROGPROJGR1',
});

// Handle login form submission
app.post('http://127.0.0.1:5500/log%20in%20pagina/Log_in.html', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Validate username and password
  if (!username || !password) {
    res.status(400).send('Ongeldige gebruikersnaam of wachtwoord');
    return;
  }

  // Query database to check if user exists
  const query = `SELECT * FROM gebruikers WHERE email = ${escape(username)} AND wachtwoord = ${escape(password)}`;
  connection.query(query, (error, results) => {
    if (error) throw error;

    if (results.length === 1) {
      // User is authenticated, create session
      req.session.userId = results[0].id;
      res.redirect('Log_in.html');
    } else {
      // Invalid username or password
      res.status(401).send('Ongeldige gebruikersnaam of wachtwoord');
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

