const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")

const port = process.env.PORT || 4000

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connecté à MongoDB")
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error.message)
        process.exit(1)
    }
}

app.get('/', (req, res) => {
    res.send('Mon premier backend marche!')
})

const startServer = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log("serveur tourne bien au " + port)
    })
}

startServer()
