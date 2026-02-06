// Importer le module express
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import salutationsRouter from './src/routes/salutations.route.js';

// Créer une application express
const app = express();
const PORT = 3000;

const accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'});

morgan.token('date-clf', function() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}:${hours}:${minutes}:${seconds} +0000`;
});

app.use(morgan(':date-clf => :method :url :status - :response-time ms', {
    stream: accessLogStream
}));

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'Bienvenue API !'});
});

app.use('/api/salutations', salutationsRouter);

app.get('/', (req, res) => {
    res.send("<h1>Mon premier serveur web sur express !</h1>");
})

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});