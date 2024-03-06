const dotenv = require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');

//mongoose.connect('mongodb://SmartLight:123456789@localhost/SmartLight',
var MONGODB_URI = process.env.MONGODB_URI;
var PORT = process.env.PORT
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDB');
    //to  app.js

    
})
.catch((err)=>{
    console.error('error connecting to mongodb',err)
})

module.exports = app;