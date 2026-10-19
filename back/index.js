const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Mon backend marche!')
})

app.listen(port, () => {
    console.log("serveur tourne bien au " + port)
})