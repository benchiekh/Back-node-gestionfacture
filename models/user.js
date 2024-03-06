const mongoose = require('mongoose')
schema=mongoose.Schema;
const bcrypt = require('bcrypt');
const userschema = new schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: false,
    },
    status: {
        type: Boolean,
        require: false,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    telephone: {
        type: String,
        require: true,
    },
    /*
    Reservation: [{
        type: Schema.Types.ObjectId,
        ref: "Reservation",
    }],  */

})
userschema.pre('save',async function(next){
    const user =this;
    if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,10)
    } 
  })

module.exports =mongoose.model('User',userschema);