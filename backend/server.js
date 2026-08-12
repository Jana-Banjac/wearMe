const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
// uvozimo express
const express = require("express");
// inicijalizujemo aplikaciju
const app = express();
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
// uvozimo f-ju za povezivanje na mongo db bazu
const connectDB = require('./config/dbConn')
// povezujemo se na mongo db bazu
const mongoose = require('mongoose')
// slusamo na dogadjaj konekcije sa bazom
const { logEvents } = require('./middleware/logger')
// definisemo port na kom ce server raditi
const PORT = process.env.PORT || 3500;

// ispisujemo u konzolu vrednost node_env promenljive okruzenja
console.log(process.env.NODE_ENV)

// povezujemo se na mongo db bazu
connectDB()

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

// definisemo API rute
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/upload', require('./routes/uploadRoutes'))
app.use('/api/config', require('./routes/configRoutes'))

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

// kada se konekcija na MongoDB uspesno otvori
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')

    // pokreni server tek kada je baza povezana
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

// hvatanje gresaka na konekciji nakon inicijalnog povezivanja 
mongoose.connection.on('error', err => {
    console.log(err)

    // logovanje greske u fajl mongoErrLog.log preko logEvents funkcije
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log'
    )
})
