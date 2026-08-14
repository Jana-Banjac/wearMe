const mongoose = require('mongoose')
const dns = require('node:dns')

dns.setServers(['8.8.8.8', '1.1.1.1'])

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI)

        console.log(`MongoDB povezan: ${conn.connection.host}`)
    } catch (err) {
        console.log(err.message)

        process.exit(1)
    }
}

module.exports = connectDB
