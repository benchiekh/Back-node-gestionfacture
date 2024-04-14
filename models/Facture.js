
const mongoose = require('mongoose');



////baad hez b K3aba l blasthm w ziit les atrb naqqsyn
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },

});


const depenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
   
});


const factureSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    
});

// Article 
const articleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    
});

// Define models based on the schemas
const Contact = mongoose.model('Contact', contactSchema);
const Depense = mongoose.model('Depense', depenseSchema);
const Facture = mongoose.model('Facture', factureSchema);
const Article = mongoose.model('Article', articleSchema);

module.exports = {Contact, Depense, Facture, Article };
