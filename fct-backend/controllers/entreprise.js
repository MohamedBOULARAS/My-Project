const Entreprise = require('../Modals/EntrepriseModal');
const mongoose = require ('mongoose'); 


//Post entreprise
exports.createEntreprise = (req, res, next) => {
  console.log(req)
    const entreprise = new Entreprise({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    entreprise
      .save()
      .then(() => res.status(201).json({ message: 'Entreprise enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  //Get All entreprise
  exports.getAllEntreprises = (req, res, next) => {
    Entreprise.find()
      .then(entreprises => res.status(200).json(entreprises))
      .catch(error => res.status(400).json({ error }));
  };

  // Get One Entreprise
  exports.getOneEntreprise = (req, res, next) => {
    Entreprise.findOne({ _id: req.params.id })
      .then(entreprise => res.status(200).json(entreprise))
      .catch(error => res.status(404).json({ error }));
  };

  //Update Entreprise
  exports.modifyEntreprise = (req, res, next) => {
    Entreprise.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  //Delete Entreprise
  exports.deleteEntreprise = (req, res, next) => {
    Entreprise.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };