import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const contactSchema = mongoose.Schema({
    nom: {type:String, required:true},
    prenom: {type:String, required:true},
    entreprise: {type:String, required:true},
    telephone: {type:Number, required:true},
    email: {type:String, required:true},
    adresse: {type:String, required:true},
},
{ collection: 'contact-data' });

autoIncrement.initialize(mongoose.connection);
contactSchema.plugin(autoIncrement.plugin, 'contact');
const postContact = mongoose.model('contact', contactSchema);


export default postContact;