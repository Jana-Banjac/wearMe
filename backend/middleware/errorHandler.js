// uvozimo logevents funkciju iz lokalnog fajla logger
const { logEvents } = require('./logger')

// definisemo errorhandler midlver funkciju koja prima err, req, res i next parametre
const errorHandler = (err, req, res, next) => {
    // pozivamo logevents da zabelezi naziv greske, poruku, metodu, url i origin zaglavlje u errlog.log fajl
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    // ispisujemo stack trace greske u konzolu
    console.log(err.stack)

    // proveravamo da li je status kod vec postavljen na odgovoru, ako nije dodeljujemo 500 za serversku gresku
    const status = res.statusCode ? res.statusCode : 500 // server error

    // postavljamo http status kod odgovora
    res.status(status)

    // saljemo json odgovor sa porukom greske
    res.json({ message: err.message })
}

// izvozimo errorhandler funkciju iz ovog modula
module.exports = errorHandler