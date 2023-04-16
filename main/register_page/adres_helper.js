'use strict';

export async function geeftPostcodes(postalCode) {

    try {
        const response = await fetch(`https://api.basisregisters.vlaanderen.be/v2/postinfo/${postalCode}`);
        const data = await response.json();
        const gemeents = [];
        for (var i = 0; i < data.postnamen.length; ++i) {
            let result = data.postnamen[i].geografischeNaam;
            if (result !== undefined) {
                gemeents.push(result.spelling);
            }
        }
        return gemeents;
    } catch {
        return [];
    }

}

export async function geeftStraatnamen(postalCode, street) {

    try {
        const limit = 10;
        const url = `https://api.basisregisters.vlaanderen.be/v2/adresmatch?postcode=${postalCode}&straatnaam=${street}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        const straten = [];
        for (var i = 0; i < data.adresMatches.length; ++i) {
            let result = data.adresMatches[i].straatnaam;
            if (result !== undefined) {
                straten.push(result.straatnaam.geografischeNaam.spelling);
            }
        }
        return straten;
    } catch {
        return [];
    }

}

export async function bestaatAdres(postalCode, street, houseNumber) {

    try {
        const limit = 10;
        const url = `https://api.basisregisters.vlaanderen.be/v2/adresmatch?postcode=${postalCode}&straatnaam=${street}&huisnummer=${houseNumber}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.adresMatches[0].volledigAdres !== undefined) {
            return true;
        } else {
            return false;
        }
    } catch {
        console.log(error);
        return false;
    }
}
