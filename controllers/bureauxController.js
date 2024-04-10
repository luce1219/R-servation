const prisma = require('../prisma/primaclient')


const getBureaux = async (req, res) => {
    try {
        const bureaux = await prisma.bureau.findMany();
        res.json(bureaux);
    } catch (error) {
        console.error('Erreur lors de la récupération des bureaux :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des bureaux.' });
    }
};


//Ma création d"un nouveau bureau

const postBureaux = async (req, res) => {
    const { title, description, location, prix } = req.body;
    try {
      const nouveauBureau = await prisma.bureau.create({
        data: { title, description, location, prix },
      });
      res.status(201).json(nouveauBureau);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du bureau.' });
    }
  };


  //la mis à jour d'un bureaux

  const putBureaux = async (req, res) => {
    const bureauId = parseInt(req.params.id);
    const { title, description, location, prix } = req.body;
    try {
      const bureauMisAJour = await prisma.bureau.update({
        where: { id: bureauId },
        data: { title, description, location, prix },
      });
      res.json(bureauMisAJour);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du bureau.' });
    }
  };

// Suppresion d'un bureaux
  
  const deleteBureaux = async (req, res) => {
    const bureauId = parseInt(req.params.id);
    try {
      await prisma.bureau.delete({
        where: { id: bureauId },
      });
      res.json({ message: 'Bureau supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du bureau.' });
    }
  };

  module.exports = {
    getBureaux,
    postBureaux,
    putBureaux,
    deleteBureaux
  }
