const prisma = require('../prisma/primaclient')


 //les routes  pour l'utilisateur 

 const getUsers = async (req, res) => {
    try {
        const user = await prisma.user.findMany();
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateur:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateur.' });
    }
  };


   //POST - Créer un nouvel utilisateur :

   const postUsers = async (req, res) => {
    const { email } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          email
        }
      });
      res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur lors de la création des utilisateur:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
    }
  };

   
//PUT - Mettre à jour un utilisateur existant :
const putUsers = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id)
        },
        data: {
          email
        }
      });
      res.json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la création des utilisateur:', error);  
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
  };



  
 //DELETE - Supprimer un utilisateur existant :
 
 const deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: {
          id: parseInt(id)
        }
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
  };


  module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
  }

  

  
   