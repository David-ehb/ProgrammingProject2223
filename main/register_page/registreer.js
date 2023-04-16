import * as Registratie from "./registratie.js";
import * as AdresHelper from "./adres_helper.js";

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


form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting normally

  // get the form data
  const formData = new FormData(form);
  console.log(formData.get("email"));
  Registratie.registreerGebruiker(formData.get("email"), formData.get("password"))
    .then(function (isSuccess) {
      if (isSuccess) {
        // Redirect naar profiel pagina
        // TODO: maakt gebruik van vscode livesever, moet nog aangepast worden
        window.location.href = "http://localhost:5501/main/register_page/registreer_profiel.html";
      }
      else {
        document.getElementById("email-errormessage").innerHTML = "E-mailadres is al in gebruik";
      }
    })
    .catch(function (error) {
      console.log("foutieve fetch");
      console.log(error);
      return false;
    });
});

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
usernameInput.addEventListener("input", function () {
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

let validatePostalCode = async () => {
  if (postcodeInput.value.length == 4) {
    try {
      const codes = await AdresHelper.geeftPostcodes(postcodeInput.value);
      if (codes.length > 0) {
        for (var i = 0; i < codes.length; ++i) {
          const gemeente = codes[i];
          const option = document.createElement("option");
          option.value = gemeente;
          option.text = gemeente;
          gemeenteSelect.appendChild(option);
        }
        // Terugleegmaken van de error message indien de error message nog steeds zichtbaar is
        postcodeError.textContent = "";
      } else {
        postcodeError.textContent = 'Postcode bestaat niet.';
        gemeenteSelect.innerHTML = "";
      }
    } catch (error) {
      console.log(error);
      straatError.textContent = 'Straatnaam bestaat niet.';
    }
  } else {
    postcodeError.textContent = 'Postcode moet uit exact 4 cijfers bestaan.';
  }
};

postcodeInput.addEventListener("input", debounce(validatePostalCode, 500));


let validateStreet = async () => {
  if (straatInput.value.length > 0 && postcodeInput.value.length == 4 && postcodeError.textContent == "") {
    try {
      const data = await AdresHelper.geeftStraatnamen(postcodeInput.value, straatInput.value);
      if (data.length > 0) {
        const straatSelect = document.getElementById("straat-choices");
        straatSelect.innerHTML = "";
        for (var i = 0; i < data.length; ++i) {
          const straat = data[i];
          // Voorkomt dat de straatnaam dubbel wordt toegevoegd aan de lijst
          if (straat !== undefined && straat !== straatInput.value) {
            const option = document.createElement("option");
            option.value = straat;
            option.text = straat;
            straatSelect.appendChild(option);
          }
        }
        // Terugleegmaken van de error message indien de error message nog steeds zichtbaar is
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

let validateHuisNummber = async () => {
  if (postcodeError.textContent == "" && straatError.textContent == "" && straatInput.value.length > 0 && postcodeInput.value.length == 4 && huisnummerInput.value.length > 0) {
    try {
      const bestaatAdres = await AdresHelper.bestaatAdres(postcodeInput.value, straatInput.value, huisnummerInput.value);
      if (bestaatAdres) {
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