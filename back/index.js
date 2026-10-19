const express = require("express")
const cors = require("cors")
const app = express()
 
const dotenv = require("dotenv")
dotenv.config()
 
const port = process.env.PORT || 4000
 
// Autorise le front (autre origine) à appeler ce back
app.use(cors())
// Permet de lire le JSON envoyé par le front (req.body)
app.use(express.json())
 
app.get('/', (req, res) => {
    res.send('Mon backend marche!')
})
 
// Route appelée par le front
app.get('/api/message', (req, res) => {
    res.json({ message: "Salut depuis le back !" })
})
 
// Exemple de route POST : le front envoie du JSON, le back répond
app.post('/api/message', (req, res) => {
    const { nom } = req.body
    res.json({ message: "Bonjour " + nom + ", bien reçu par le back !" })
})
 
app.listen(port, () => {
    console.log("serveur tourne bien au " + port)
})