const mongoose = require('mongoose')
const Schema=mongoose.Schema;
const articleSchema =Schema({
    Prix_Unitaire_HT: Number,
    Description: String,
    Quantite: Number,
    Total_HT: Number,
})

module.exports =mongoose.model('Article',articleSchema);