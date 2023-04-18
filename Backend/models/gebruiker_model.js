const Model = require('./model.js');

// Code voor opzetten van de databank connectie
const pool = require('../db/db_connection.js');

module.exports = new class GebruikerModel extends Model {

    constructor() {
        super('gebruikers', 'gebnr');
    }

    // methode die true geeft als email al bestaat in de database
    bestaat_email(email) {

        return new Promise(function (myResolve, myReject) {
            pool.execute(
                `SELECT * FROM gebruikers WHERE email = ?`,
                [email],
                function (error, result) {
                    if (error) throw error;
                    if (result.length > 0) {
                        myResolve(true);
                    } else {
                        myResolve(false);
                    }
                })
        });

    }

    //methode die gebruiker aanmaakt, wanneer e-mail nog niet bestaat in db, anders geeft het een error dat e-mail al bestaat
    async create_nieuwe_gebruiker(email, wachtwoord) {
        let bestaat_email = await this.bestaat_email(email)

        if (bestaat_email) {
            return false;
        }
        else {
            console.log("Email bestaat niet");
            pool.execute(
                `INSERT INTO gebruikers (gebnr, email, wachtwoord, voornaam, naam, postcode, gemeente, straat, huisnummer, bus, telefoonnr)
                    VALUES (?, ?, ?, '', '', 0, '', '', '', '', '')`,
                [Math.floor(Math.random() * 10000).toString(), email, wachtwoord],
                function (error, result) {
                    if (error) throw error;
                    console.log("1 record inserted");
                });
            return true;
        }

    }

}
