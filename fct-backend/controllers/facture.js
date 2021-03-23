const Facture = require('../Modals/FactureModal');
const mongoose = require ('mongoose'); 


//Post Facture
exports.createFacture = (req, res, next) => {
    const facture = new Facture({
      //numero_de_facture: req.body.numero_de_facture,
      //date_de_facture: req.body.date_de_facture,
      //discription: req.body.discription,
      //date_envoi: req.body.date_envoi,
      //date_echeance: req.body.date_echeance,
      //numero_bc: req.body.numero_bc,
      //note: req.body.note,
      //prix_ht: req.body.prix_ht,
      //quantite: req.body.quantite,
      //prix_total: req.body.prix_total,
      //prix_remise: req.body.prix_remise,
      //rix_total_ht: req.body.prix_total_ht,
      //prix_frais: req.body.frais,
      //produit: req.body.produit,
      //clt: req.body.clt,
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    facture
      .save()
      .then(() => res.status(201).json({ message: 'Facture enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  //Get All Facture
  exports.getAllFactures = (req, res, next) => {
    Facture.find().populate('user_id')
                  .populate('client_id')
                  .populate('produit_id').exec()
      .then(factures => res.status(200).json(factures))
      .catch(error => res.status(400).json({ error }));
  };

  //Get One Facture
  exports.getOneFacture = (req, res, next) => {
    Facture.findOne({ _id: req.params.id })
      .then(produit => res.status(200).json(produit))
      .catch(error => res.status(404).json({ error }));
  };

  //UpDate Facture
  exports.modifyFacture = (req, res, next) => {
    Facture.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  //Delete Facture
  exports.deleteFacture = (req, res, next) => {
    Facture.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };