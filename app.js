const express = require("express");
const mongoose = require('mongoose');
const app  = express();
require('./config/database.js')
const userRouter=require('./router/user.js')
const FactureRouter=require('./router/Facture')
const ArticleRouter=require('./router/Article.js')
const DepenseRouter=require('./router/Depense.js')
var cors = require('cors');
// use it before all route definitions
app.use(cors())
const detenv = require('dotenv').config()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.listen(process.env.PORT,()=>{
    console.log(`server is running in port ${process.env.PORT}`);
})

app.use('/user',userRouter);
app.use('/facture',FactureRouter);
app.use('/article',ArticleRouter);
app.use('/depense',DepenseRouter);
