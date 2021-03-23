const express = require('express');
const mongoose = require ('mongoose'); 
const router = express.Router();
const fournisseurCtrl = require('../controllers/fournisseur');

const auth = require('../middleware/auth');


// Post Fournisseur
router.post('/',  fournisseurCtrl.createFournisseur);

  //Get All Fournisseur
  router.get('/', fournisseurCtrl.getAllFournisseurs);

  // Get One Fournisseur
  router.get('/:id', auth, fournisseurCtrl.getOneFournisseur);

  //UpDate Fournisseur
  router.put('/:id', fournisseurCtrl.modifyFournisseur);

  //Delete Fournisseur
  router.delete('/:id',  fournisseurCtrl.deleteFournisseur);


  module.exports = router;


