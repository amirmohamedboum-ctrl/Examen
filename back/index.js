const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")

let connectionPromise

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("La variable d'environnement MONGODB_URI est manquante.")
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI).catch((error) => {
            connectionPromise = null
            throw error
        })
    }

    try {
        await connectionPromise
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error.message)
        throw error
    }
}

app.use(async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (error) {
        next(error)
    }
})

app.get('/', (req, res) => {
    res.send('Mon premier backend marche!')
})

app.use((error, req, res, next) => {
    console.error("Erreur du backend :", error.message)
    res.status(503).send("Le backend est temporairement indisponible.")
})

if (require.main === module) {
    const port = process.env.PORT || 4000

    connectDB().then(() => {
        app.listen(port, () => {
            console.log("serveur tourne bien au " + port)
        })
    }).catch(() => {
        process.exitCode = 1
    })
}

module.exports = app
