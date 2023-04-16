"use strict";

export async function registreerGebruiker(email, wachtwoord) {
    console.log("Registreer gebruiker" + email);
    let promise = await fetch("http://localhost:3000/registreer", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ email: email, wachtwoord: wachtwoord })
    });

    let json = await promise.json();
    try {
        if (json.success == true) {
            console.log("Gebruiker aangemaakt");
            return true;
        }
        else {
            console.log(json.message);
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;   
    }

}