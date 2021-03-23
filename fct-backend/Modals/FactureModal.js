const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const factureSchema = mongoose.Schema({
    facture_id: mongoose.Schema.Types.ObjectId,
    numero_de_facture: { type: String, unique: true, required: true},
    type_facture:  { type: String, min: 6, max: 1024 },
    date_de_facture: { type: Date, required: true, default: Date.now},
    discription: { type: String, min: 6, max: 1024 },
    date_envoi: { type: Date, required: true},
    date_echeance: { type: Date, required: true},
    numero_bc: { type: String, min: 6, max: 255 },
    note: { type: String, min: 6, max: 1024 },
    prix_ht: { type: Number, unique: false, required: false},
    quantite: { type: Number, unique: false, required: false},
    prix_total: { type: Number, unique: false, required: false},
    prix_remise: { type: Number, unique: false, required: false},
    prix_total_ht: { type: Number, unique: false, required: false},
    prix_frais: { type: Number, unique: false, required: false},
    prix_tva: { type: Number, unique: false, required: false},
    prix_timbre: { type: Number, unique: false, required: false},
    prix_ttc: { type: Number, unique: false, required: false},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    clients: [{
        raison_social: String,
    }],
    produit:  [{
        nom_du_produit: String,
        discription: String,
        prix_vente: Number,
        prix_ht: Number,
        quantite: Number,
        prix_total: Number,
        prix_remise: Number
    }],

    is_FCT_fournisseur: { type: Boolean, required: false },
});

factureSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Facture', factureSchema);