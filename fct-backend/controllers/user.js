const User = require('../Modals/UserModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require ('mongoose'); 


//Validation Schma



//Post User
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          entr: req.body.entr
        });
        
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error: error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  
  //Get All Users
  exports.getAllUsers = (req, res, next) => {
    User.find().populate('entreprise_id').exec()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
  }; 

  //Get One User
  exports.getOneUser = (req, res, next) => {
    User.findOne({
      _id: req.params.id
    }).then(
      (user) => {
        res.status(200).json(user);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  //Update user
  exports.modifyUser = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

  //Delete user
  exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };


  //-----------Login-------
  //Post Login
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.user_id,
              token: jwt.sign(
                { userId: user.user_id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              ),
              user: user,
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };