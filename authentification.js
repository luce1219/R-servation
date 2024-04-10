const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express(); // Créez une instance Express si elle n'existe pas déjà dans ce fichier

app.use(express.json());
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
}));

const jwtSecretKey = 'secretkey';

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide' });
  }
};


// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur interne du serveur');
  });
  

// Route pour la page de connexion

app.get('/login', (req, res) => {
  res.send('Page de connexion');
});

  
app.post('/login', (req, res) => {
  const { phoneNumber } = req.body;

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: 'Numéro de téléphone invalide' });
  }

  try {
    const token = jwt.sign({ phoneNumber }, jwtSecretKey);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la génération du token' });
  }
});

app.get('/dashboard', authenticateUser, (req, res) => {
  res.send(`Bienvenue ${req.user.phoneNumber} sur votre tableau de bord`);
});

const isValidPhoneNumber = (phoneNumber) => {
  // Implémentez ici une logique de validation réelle pour les numéros de téléphone
  // Retournez true si le numéro est valide, false sinon
  return true;
};

module.exports = app; // Exportez l'instance d'Express pour l'utiliser ailleurs si nécessaire
