
const mongoose = require('mongoose');
const factureSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    Date_fact: Date,
    Date_paie: Date,
    Type_paie: String,
    Etat_paie :String, 
    Nom_fourniseur :  String,
})


module.exports =mongoose.model('Facture',factureSchema);
