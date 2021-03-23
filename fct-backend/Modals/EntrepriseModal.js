const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const entrepriseSchema = mongoose.Schema({
    entreprise_id: mongoose.Schema.Types.ObjectId,
    code_entreprise: { type: String, required: true, unique: true},
    raison_social: { type: String, required: true, unique: true}, 
    type_entreprise: { type: String, required: false, unique: true}, 
    email: { type: String, required: true, unique: true},
    tell: { type: Number, required: true, unique: true},
    adresse: { type: String, required: true },
    activite: { type: String, required: false },

});

entrepriseSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Entreprise', entrepriseSchema);