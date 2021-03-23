const express = require('express');
const mongoose = require ('mongoose'); 
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

// Post users
router.post('/signup',  userCtrl.signup);

  //Get All User
  router.get('/', userCtrl.getAllUsers);

  // Get One User
  router.get('/:id', userCtrl.getOneUser);

  //UpDate User
  router.put('/:id', userCtrl.modifyUser);

  //Delete User
  router.delete('/:id', auth, userCtrl.deleteUser);

    //-----Login---------
  //Post Login
  router.post('/login', userCtrl.login);





  module.exports = router;

