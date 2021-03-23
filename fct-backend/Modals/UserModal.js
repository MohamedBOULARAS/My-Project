const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    code_user: { type: String, unique: true, required: false},
    username: { type: String, unique: false, required: false, min: 6, max: 255 },
    firstname: { type: String, unique: false, required: false, min: 6, max: 255 },
    lastname: { type: String, unique: false, required: false, min: 6, max: 255 },
    email: { type: String, unique: true, required: true, min: 6, max: 255 },
    password: { type: String, unique: false, required: false, min: 6, max: 255 },
    role: { type: String},
    date: { type: Date, default: Date.now},
    entr: [{
        raison_social: String,
    }],
    
    /*
    entreprise_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise'
    },
    */




    
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);


 

    