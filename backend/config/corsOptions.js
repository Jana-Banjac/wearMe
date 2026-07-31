// uvozimo niz dozvoljenih origin adresa iz lokalnog fajla allowedorigins
const allowedOrigins = require('./allowedOrigins')

// definisemo cors opcije za konfigurisanje cors paketa
const corsOptions = {
    // funkcija za proveru da li je zahtev sa dozvoljenog izvora
    origin: (origin, callback) => {
        // proveravamo da li se origin nalazi u nizu dozvoljenih ili ako origin ne postoji npr server-to-server zahtevi
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // dozvoljavamo zahtev bez greske
            callback(null, true)
        } else {
            // odbijamo zahtev sa greskom da nije dozvoljen po cors-u
            callback(new Error('Not allowed by CORS'))
        }
    },
    // omogucavamo slanje kredencijala kao sto su kolacici ili autorizacioni hederi
    credentials: true,
    // postavljamo status kod za uspešne options preflight zahteve na 200
    optionsSuccessStatus: 200
}

module.exports = corsOptions