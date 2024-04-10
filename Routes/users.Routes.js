//Importation d'express js
const express = require('express')
const router = express.Router()

const {getUsers, postUsers, putUsers, deleteUsers} = require('../controllers/usersController')

router.get('/users', getUsers);
router.post('/users', postUsers);
router.put('/users', putUsers);
router.delete('/users', deleteUsers);



module.exports = router;