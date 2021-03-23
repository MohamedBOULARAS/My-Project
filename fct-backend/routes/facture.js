const express = require('express');
const mongoose = require ('mongoose'); 
const router = express.Router();
const factureCtrl = require('../controllers/facture');

const auth = require('../middleware/auth');

  //Post Facture
  router.post('/', factureCtrl.createFacture);
  //Get All Facture
  router.get('/', factureCtrl.getAllFactures);

  // Get One facture
  router.get('/:id', factureCtrl.getOneFacture);

  //UpDate facture
  router.put('/:id',factureCtrl.modifyFacture);

  //Delete Entreprise
  router.delete('/:id',  auth, factureCtrl.deleteFacture);

module.exports = router;

