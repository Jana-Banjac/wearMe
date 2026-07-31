// uvozimo format f-ju iz date-fns paketa za rad sa datumima
const { format } = require('date-fns')
// uvozimo v4 i menjamo joj ime u uuid za generisanje jedinstvenih id-jeva
const { v4: uuid } = require('uuid')
// uvozimo ugradjeni fs modul za rad sa fajlovima
const fs = require('fs')
// uvozimo fs promises api za asinhroni rad sa fajlovima preko promise-a
const fsPromises = require('fs').promises
// uvozimo path modul za rad sa putanjama fajlova i direktorijuma
const path = require('path')

// def asinhronu f-ju logevents koja prima poruku i naziv fajla za logovanje
const logEvents = async (message, logFileName) => {
    // kreiramo formatirani datum i vreme pomocu date-fns biblioteke
    const dateTime = `${format(new Date(), 'ddMMyyyy\tHH:mm:ss')}`
    
    // tekst log stavke = datum + jedinstveni uuid + poruka 
    // svaki logItem je u novom redu 
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        // da li logs folder vec postoji na putanji iznad trenutnog direktorijuma
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            // ako ne, kreiramo taj folder asinhrono
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        // dodajemo novu log stavku u fajl unutar logs foldera
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        // hvatamo eventualne greske pri radu sa fajlovima
        console.error(err)
    }
}

// middleware f-ja logger, prima req, res i next parametre
const logger = (req, res, next) => {
    // pozivamo logevents f-ju da zabelezi http metodu, url i origin zaglavlje u reqlog.log fajl
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    // ispisujemo u konzolu http metodu i putanju zahteva
    console.log(`${req.method} ${req.path}`)
    // pozivamo next --> prebacuje kontrolu na sledeci middleware ili rutu
    next()
}

// izvozimo logevents i logger f-je iz ovog modula
module.exports = { logEvents, logger }