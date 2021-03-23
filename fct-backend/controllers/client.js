const Client = require('../Modals/ClientModal');
const mongoose = require('mongoose');


//Post Client
exports.createClient = (req, res, next) => {
  const client = new Client({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  });
  client
    .save()
    .then((data) => res.status(201).json({ message: 'Client enregistré !', client: data }))
    .catch(error => res.status(400).json({ error })); 
};

//Get all users
exports.getAllClients = (req, res, next) => {
  Client.find().populate('user_id').exec()
    .then(clients => res.status(200).json(clients))
    .catch(error => res.status(400).json({ error }));
};

//get One Client
exports.getOneClient = (req, res, next) => {
  Client.findOne({
    _id: req.params.id
  }).then(
    (client) => {
      res.status(200).json(client);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Update Client
exports.modifyClient = (req, res, next) => {
  Client.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

//Delete Client
exports.deleteClient = (req, res, next) => {
  Client.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};
