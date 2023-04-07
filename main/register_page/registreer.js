fetch('https://dt5.ehb.be/path/to/retrieve_data.php')
  .then(response => response.json())
  .then(data => {
    // Process retrieved data
    console.log(data);
  })
  .catch(error => {
    // Handle error
    console.error(error);
  });


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const form = document.querySelector('form');
const postcodeInput = document.querySelector('#postcode');
const postcodeError = document.querySelector('#postcode-error');

const straatInput = document.querySelector('#straat');
const straatError = document.querySelector('#straat-error');

const huisnummerInput = document.querySelector('#huisnummer');
const huisnummerError = document.querySelector('#huisnummer-error');


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
usernameInput.addEventListener("input", function(){
// Get the entered username
const username = usernameInput.value.trim();
fetch("check_username.php?username=" + encodeURIComponent(username))
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        // Display an error message if the username already exists
        usernameValidation.textContent = "Deze gebruikersnaam is al in gebruik.";
      } else {
        // Clear the error message if the username doesn't exist
        usernameValidation.textContent = "";
      }
    })
    .catch(error => {
      console.error(error);
    });
});

const successPopup = document.querySelector('#success-popup');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (true) {
    successPopup.style.display = 'block';
    form.reset();
    setTimeout(() => {
      successPopup.style.display = 'none';
    }, 3000); // de pop-up verdwijnt na 3 seconden
  }
});

const gsmInput = document.getElementById("gsm");
const gsmError = document.getElementById("gsm-error");

// create a regex for belgium celphone number without spaces
form.addEventListener('submit', (event) => {
  const gsmPattern = /(\d{9})?/;
  if (!gsmPattern.test(gsmInput.value)) {
    event.preventDefault();
    gsmError.textContent = 'Voer een geldig Belgisch GSM-nummer in (bijvoorbeeld: +32 49 123 45 67).';
  } else {
    gsmError.textContent = '';
  }
});


const gemeenteSelect = document.getElementById("gemeente");

validatePostalCode = async () => {
  if (postcodeInput.value.length == 4) {
    try {
      const response = await fetch(`https://api.basisregisters.vlaanderen.be/v2/postinfo/${postcodeInput.value}`);
      const data = await response.json();
      gemeenteSelect.innerHTML = "";
      for (var i = 0; i < data.postnamen.length; ++i) {
        let result = data.postnamen[i].geografischeNaam;
        if (result !== undefined) {
          const option = document.createElement("option");
          option.value = result.spelling;
          option.text = result.spelling;
          gemeenteSelect.appendChild(option);
        }
      }
      straatError.textContent = "";
    } catch {
      postcodeError.textContent = 'Postcode bestaat niet.';
    }
  } else {
    postcodeError.textContent = '';
  }
};

postcodeInput.addEventListener("input", debounce(validatePostalCode, 500));

const straatSelect = document.getElementById("straat-choices");

validateStreet = async () => {
  if (straatInput.value.length > 0 && postcodeInput.value.length == 4 && postcodeError.textContent == "") {
    try {
      const limit = 10;
      const url = `https://api.basisregisters.vlaanderen.be/v2/adresmatch?postcode=${postcodeInput.value}&limit=${limit}&straatnaam=${straatInput.value}`;
      const response = await fetch(url);
      const data = await response.json();
      straatSelect.innerHTML = "";
      if (data.adresMatches[0].straatnaam !== undefined) {
        for (var i = 0; i < data.adresMatches.length; ++i) {
          let result = data.adresMatches[i].straatnaam;
          if (result !== undefined && result.straatnaam.geografischeNaam.spelling !== straatInput.value) {
            const option = document.createElement("option");
            option.value = result.straatnaam.geografischeNaam.spelling;
            option.text = result.straatnaam.geografischeNaam.spelling;
            straatSelect.appendChild(option);
          }
        }
        straatError.textContent = "";  
      } else {
        straatError.textContent = 'Straatnaam bestaat niet.';
      }
    } catch (error) {
      console.log(error);
      straatError.textContent = 'Straatnaam bestaat niet.';
    }
  } else if (postcodeError.textContent != "") {
    straatError.textContent = 'Vul postcode in';
  } else {
    straatError.textContent = 'Straatnaam bestaat niet.';
  }
};

straatInput.addEventListener("input", debounce(validateStreet, 500));

validateHuisNummber = async () => {
  if (postcodeError.textContent == "" && straatError.textContent == "" && straatInput.value.length > 0 && postcodeInput.value.length == 4 && huisnummerInput.value.length > 0) {
    try {
      const limit = 10;
      const url = `https://api.basisregisters.vlaanderen.be/v2/adresmatch?postcode=${postcodeInput.value}&limit=${limit}&straatnaam=${straatInput.value}&huisnummer=${huisnummerInput.value}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.adresMatches[0].volledigAdres !== undefined) {
        huisnummerError.textContent = "";
      } else {
        huisnummerError.textContent = 'Huisnummer bestaat niet.';
      }
    } catch (error) {
      console.log(error);
      huisnummerError.textContent = 'Huisnummer bestaat niet.';
    }
  }
}

huisnummerInput.addEventListener("input", debounce(validateHuisNummber, 100));