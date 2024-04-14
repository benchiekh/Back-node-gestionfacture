import mongoose from 'mongoose';


const DepenseSchema = mongoose.Schema({
    Categorie: String,
    Date_paie: String,
    Etat_paie: String,
    Prix: Number
})

module.exports =mongoose.model('Depense',DepenseSchema);