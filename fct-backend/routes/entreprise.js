const express = require('express');
const mongoose = require ('mongoose'); 
const router = express.Router();
const entrepriseCtrl = require('../controllers/entreprise');

const auth = require('../middleware/auth');


  //PostEntreprise
  router.post('/', entrepriseCtrl.createEntreprise);

  //Get All Entreprise
  router.get('/', entrepriseCtrl.getAllEntreprises);

  // Get One Entreprise
  router.get('/:id', entrepriseCtrl.getOneEntreprise);

  //UpDate Entreprise
  router.put('/:id', entrepriseCtrl.modifyEntreprise);

  //Delete Entreprise
  router.delete('/:id',entrepriseCtrl.deleteEntreprise);


module.exports = router;
