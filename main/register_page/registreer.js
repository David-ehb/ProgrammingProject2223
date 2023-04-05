  const form = document.querySelector('form');
  const postcodeInput = document.querySelector('#postcode');
  const postcodeError = document.querySelector('#postcode-error');

  form.addEventListener('submit', (event) => {
    if (postcodeInput.validity.patternMismatch) {
      event.preventDefault();
      postcodeError.textContent = 'Postcode moet uit exact 4 cijfers bestaan.';
    } else {
      postcodeError.textContent = '';
    }
  });


  function validateForm() {
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("confirm_password");
    var error_message = document.getElementById("password_error");
  
    if (password.value != confirm_password.value) {
      error_message.innerHTML = "Wachtwoorden komen niet overeen";
      return false;
    } else {
      error_message.innerHTML = "";
      return true;
    }
  }

const usernameInput = document.getElementById("username");
const usernameValidation = document.getElementById("username-validation");

// Event listener voor het controleren van de gebruikersnaam
usernameInput.addEventListener("input", checkUsername);

// Functie om de gebruikersnaam te controleren
function checkUsername() {
  // Stuur een aanvraag naar de server om te controleren of de gebruikersnaam al bestaat
  // In dit voorbeeld wordt gebruik gemaakt van een mockup API endpoint
  fetch(`https://example.com/api/username-exists?username=${usernameInput.value}`)
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        usernameValidation.textContent = "Deze gebruikersnaam is al in gebruik.";
      } else {
        usernameValidation.textContent = "";
      }
    })
    .catch(error => {
      usernameValidation.textContent = "Er is een fout opgetreden bij het controleren van de gebruikersnaam.";
    });
}




