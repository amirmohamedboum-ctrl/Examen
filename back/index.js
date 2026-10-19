const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

let connectionPromise;

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("La variable d'environnement MONGODB_URI est manquante.");
    }

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGODB_URI)
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });
    }

    try {
        await connectionPromise;
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error.message);
        throw error;
    }
}

app.get("/", (req, res) => {
    res.status(200).send("Mon premier backend marche !");
});

app.get("/health", async (req, res) => {
    try {
        await connectDB();
        res.status(200).json({
            status: "OK",
            server: "running",
            database: "connected"
        });
    } catch (error) {
        console.error("Erreur de vérification du backend :", error.message);
        res.status(503).json({
            status: "ERROR",
            server: "running",
            database: "disconnected"
        });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
}

module.exports = app;
