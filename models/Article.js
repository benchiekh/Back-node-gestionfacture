import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const articleSchema = mongoose.Schema({
    Prix_Unitaire_HT: Number,
    Description: String,
    Quantite: Number,
    Total_HT: Number,
},


{ collection: 'article-data' });

autoIncrement.initialize(mongoose.connection);
articleSchema.plugin(autoIncrement.plugin, 'article');
const postArticle = mongoose.model('article', articleSchema);


export default postArticle;