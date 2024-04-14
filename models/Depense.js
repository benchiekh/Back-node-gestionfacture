import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const DepenseSchema = mongoose.Schema({
    Categorie: String,
    Date_paie: String,
    Etat_paie: String,
    Prix: Number
},
{ collection: 'expense-data' });

autoIncrement.initialize(mongoose.connection);
expenseSchema.plugin(autoIncrement.plugin, 'Depense');
const postExpense = mongoose.model('Depense', DepenseSchema);


export default postExpense;