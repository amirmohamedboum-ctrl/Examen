require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch((err) => console.error('Erreur MongoDB :', err.message));

app.get('/', (req, res) => {
    res.send('Amir, bravo');
});

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello depuis le backend !' });
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});