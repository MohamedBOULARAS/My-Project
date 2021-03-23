const mongoose = require ('mongoose');

const prodfctSchema = mongoose.Schema({
    facture_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facture'
    },
    produit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit'
    },
});


module.exports = mongoose.model('Prodfct', prodfctSchema);