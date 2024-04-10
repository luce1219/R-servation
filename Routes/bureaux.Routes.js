//Importation d'express js
const express = require('express')
const router = express.Router()

const {getBureaux, postBureaux, putBureaux, deleteBureaux} = require('../controllers/bureauxController')

router.get('/bureaux', getBureaux);
router.post('/bureaux', postBureaux);
router.put('/bureaux', putBureaux);
router.delete('/bureaux', deleteBureaux);



module.exports = router;