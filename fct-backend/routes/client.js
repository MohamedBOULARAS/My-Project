const express = require('express');
const mongoose = require ('mongoose'); 
const router = express.Router();
const clientCtrl = require('../controllers/client');

const auth = require('../middleware/auth');


// Post Client
router.post('/', clientCtrl.createClient);

  //Get All clients
  router.get('/', clientCtrl.getAllClients);

  // Get One clients
  router.get('/:id', clientCtrl.getOneClient);

  //UpDate client
  router.put('/:id', clientCtrl.modifyClient);

  //Delete client
  router.delete('/:id', auth, clientCtrl.deleteClient);


  module.exports = router;

