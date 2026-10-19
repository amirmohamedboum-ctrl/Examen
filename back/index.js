const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

let connectionPromise;

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error(
            "La variable MONGODB_URI est absente du fichier .env"
        );
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
        console.error("Erreur MongoDB :", error.message);
        throw error;
    }
}

// Route principale
app.get("/", async (req, res) => {
    try {
        await connectDB();

        res.status(200).send("Mon premier backend marche !");
    } catch (error) {
        console.error("Erreur backend :", error.message);

        res.status(503).json({
            message: "Le backend est temporairement indisponible."
        });
    }
});

// Vérification de l'état du serveur et de MongoDB
app.get("/health", async (req, res) => {
    try {
        await connectDB();

        res.status(200).json({
            status: "OK",
            server: "running",
            database: "connected"
        });
    } catch (error) {
        res.status(503).json({
            status: "ERROR",
            database: "disconnected",
            message: error.message
        });
    }
});

// Démarrage local : Nodemon / Node.js
if (require.main === module) {
    connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(
                    `Serveur démarré sur http://localhost:${PORT}`
                );
            });
        })
        .catch((error) => {
            console.error(
                "Impossible de démarrer le serveur :",
                error.message
            );
            process.exitCode = 1;
        });
}