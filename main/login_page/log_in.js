'use strict'

  // ophalen van de gegeven uit de dom 
  const loginForm = document.querySelector('form');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  loginForm.addEventListener('submit', (event) => {
  // Checken of username en paswoord niet leeg zijn
  //To Do: https://popper.js.org/ voor tooltip om aan te geven dat velden niet leeg mogen zijn.
  // attribuut required kan gebruikt worden in geval het niet lukt met popper
  if (email.trim() === '') {
    alert('Geef je gebruikersnaam in');
    event.preventDefault(); 
  }
  if (password.trim() === '') {
    alert('Geef je wachtwoord in');
    event.preventDefault(); 
  }
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Naar waar moet hier geredirect worden? aparte pagin of naar home
      window.location.href = 'index.html';
    } else {
      // error tonen
      document.querySelector('error').textContent = data.message;
    }
  })
  .catch(error => {
    console.error(error);
    // Error tonen
    document.querySelector('error').textContent = 'An error occurred. Please try again later.';
  });
});

