const Model = require('./model.js');

// Code voor opzetten van de databank connectie
const pool = require('../db/db_connection.js');

module.exports =  new class GebruikerModel extends Model {

    constructor(){
        super('gebruikers', 'gebnr');
    }

    // methode die true geeft als email al bestaat in de database
    check_email(email) {

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

}
