const mongoose = require('mongoose')
const dns = require('node:dns')

// prisilno koristimo pouzdane DNS servere (Google i Cloudflare)
// jer DNS server internet provajdera ponekad ne uspe da razresi SRV zapise za MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1'])

// f-ja za povezivanje na mongo db bazu
const connectDB = async () => {
    try {
        // pokusaj konekcije sa bazom preko connection stringa iz .env fajla
        const conn = await mongoose.connect(process.env.DATABASE_URI)

        // ako je konekcija uspesna, ispisi na koji host smo povezani
        console.log(`MongoDB povezan: ${conn.connection.host}`)
    } catch (err) {
        // ako konekcija ne uspe, ispisi gresku
        console.log(err.message)

        // ugasi server jer nema smisla da radi bez konekcije sa bazom
        process.exit(1)
    }
}

module.exports = connectDB