const Fournisseur = require('../Modals/FournisseurModal');
const mongoose = require('mongoose');


//Post Fournisseur
exports.createFournisseur = (req, res, next) => {
  const fournisseur = new Fournisseur({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  });
  fournisseur
    .save()
    .then((data) => res.status(201).json({ message: 'Fournisseur enregistré !', fournisseur: data }))
    .catch(error => res.status(400).json({ error })); 
};

//Get all Fournisseur
exports.getAllFournisseurs = (req, res, next) => {
  Fournisseur.find().populate('user_id').exec()
    .then(fournisseurs => res.status(200).json(fournisseurs))
    .catch(error => res.status(400).json({ error }));
};

//get One Fournisseur
exports.getOneFournisseur = (req, res, next) => {
  Fournisseur.findOne({ _id: req.params.id })
    .then(fournisseur => res.status(200).json(fournisseur))
    .catch(error => res.status(404).json({ error }));
};

//Update Fournisseur
exports.modifyFournisseur = (req, res, next) => {
  Fournisseur.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

//Delete Fournisseur
exports.deleteFournisseur = (req, res, next) => {
  Fournisseur.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};
