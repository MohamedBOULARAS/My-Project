const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const fournisseurSchema = mongoose.Schema({
    fournisseur_id: mongoose.Schema.Types.ObjectId,
    code_fournisseur: { type: String, unique: true, required: true},
    raison_social: { type: String, unique: true, required: true},
    nom: { type: String, required: true},
    prenom: { type: String, required: true},
    email: { type: String, required: true },
    tell: { type: String, required: false },
    adresse: { type: String, required: true },
    activite: { type: String, required: true },
    nif: { type: String, required: true },
    nis: { type: String, required: true },
    rib: { type: String, required: true },
    rc: { type: String, required: true },
    note: { type: String, min: 6, max: 1024 },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //isfournisseur: { type: Boolean, required: false, default: false },
});

fournisseurSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Fournisseur', fournisseurSchema);