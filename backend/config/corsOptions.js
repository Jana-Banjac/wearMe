const allowedOrigins = require('./allowedOrigins')

const isLocalDevelopmentOrigin = (origin) => {
    try {
        const { hostname } = new URL(origin)
        return ['localhost', '127.0.0.1', '[::1]'].includes(hostname)
    } catch {
        return false
    }
}

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || isLocalDevelopmentOrigin(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions
