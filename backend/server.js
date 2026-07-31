// uvozimo express
const express = require("express");
// inicijalizujemo aplikaciju
const app = express();
// uvozimo path modul koji nam omogucava da radimo sa putanjama fajlova
const path = require("path");
// uvozimo logger middleware iz lokalnog foldera middleware/logger
const { logger } = require('./middleware/logger')
// uvozimo errorhandler midlver iz lokalnog foldera middleware/errorhandler
const errorHandler = require('./middleware/errorHandler')
// uvozimo cookie-parser paket za obradu kolacica u zahtevima
const cookieParser = require('cookie-parser')
// uvozimo kors paket za omogucavanje cross origin resource sharing mehanizma
const cors = require('cors')
// uvozimo corsopciones iz config foldera
const corsOptions = require('./config/corsOptions')
// definisemo port na kom ce server raditi
const PORT = process.env.PORT || 3500;

// koristimo logger middleware za sve zahteve
app.use(logger) 

// koristimo cors middleware za sve zahteve
app.use(cors(corsOptions))

// middleware funkcija koja parsira json podatke iz zahteva
app.use(express.json())

// middleware funkcija koja parsira urlencoded podatke iz zahteva
app.use(cookieParser())

// gde ce express da trazi staticke fajlove (html, css, js)
// express.static() je middleware funkcija
app.use('/', express.static(path.join(__dirname, "public")));

// definisemo rute za nasu aplikaciju
app.use('/', require("./routes/root"));

// definisemo rutu za 404 gresku
app.all(/.*/, (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// koristimo errorhandler middleware za obradu gresaka
app.use(errorHandler)

// pokrecemo server da slusa zahteve
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
