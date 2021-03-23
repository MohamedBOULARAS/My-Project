const express = require('express');
const mongoose = require ('mongoose'); 
const router = express.Router();
const produitCtrl = require('../controllers/produit');

const auth = require('../middleware/auth');


//Post product
router.post('/',produitCtrl.createProduit);
  
  //Get All Produit
  router.get('/',produitCtrl.getAllProduits);
  
  // Get One Produit
  router.get('/:id', produitCtrl.getOneProduit);
  
  //UpDate produit
  router.put('/:id', auth, produitCtrl.modifyProduit);
  
  //Delete Produit
  router.delete('/:id', auth, produitCtrl.deleteProduit);


  module.exports = router;

  