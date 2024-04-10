const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');


// Créer une instance de PrismaClient
const prisma = new PrismaClient();

// Créer une instance de l'application Express
const app = express();

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Middleware CORS pour permettre les requêtes de différents domaines
app.use(cors());

// Middleware pour charger les variables d'environnement à partir du fichier .env
require('dotenv').config();

/***** Middleware pour logger la date de la requête */
app.use((req, res, next) => {
    const event = new Date();
    console.log('AUTH TIME:', event.toString());
    next();
  });
  
//
app.use('/', require('./Routes/bureaux.Routes'))
app.use('/', require('./Routes/users.Routes'))




  

  

// Middleware pour la gestion des erreurs
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Une erreur est survenue sur le serveur');
};

// Utilisation du middleware errorHandler
app.use(errorHandler);





 






// // Routes
// const userRoutes = require('../routes/userRoutes');
// app.use('/api/users', userRoutes);

// Port du serveur

const PORT = process.env.PORT || 3000;


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur exécuté sur le port ${PORT}`);
});