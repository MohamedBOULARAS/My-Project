const mongoose = require ('mongoose');

const produitSchema = mongoose.Schema({
    produit_id: mongoose.Schema.Types.ObjectId,
    code_produit: { type: String, unique: true, required: true},
    nom_du_produit: { type: String, required: true, max: 254 },
    discription: { type: String, min: 6, max: 1024 },
    prix_achat: { type: Number, required: true},
    prix_vente: { type: Number, required: true},
    note: { type: String, min: 6, max: 1024 },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
});


module.exports = mongoose.model('Produit', produitSchema);