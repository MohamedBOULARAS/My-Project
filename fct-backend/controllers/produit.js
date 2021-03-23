const Produit = require('../Modals/ProdactModal');
const mongoose = require ('mongoose'); 


//Post Prodact
exports.createProduit = (req, res, next) => {
    const produit = new Produit({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    produit
      .save()
      .then(() => res.status(201).json({ message: 'Produit enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  //Get All Product
  exports.getAllProduits = (req, res, next) => {
    Produit.find().populate('client_id').exec()
      .then(produits => res.status(200).json(produits))
      .catch(error => res.status(400).json({ error }));
  };

  //get One Product
  exports.getOneProduit = (req, res, next) => {
    Produit.findOne({ _id: req.params.id }).populate('client_id').exec()
      .then(produit => res.status(200).json(produit))
      .catch(error => res.status(404).json({ error }));
  };

  //Update Product
  exports.modifyProduit = (req, res, next) => {
    Produit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

  //Delete product
  exports.deleteProduit = (req, res, next) => {
    Produit.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };