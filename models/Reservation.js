const mongoose = require('mongoose');
const Schema = mongoose.Schema()
ReservationSchema = new Schema({

    Data_Debut: {
        type: String,
        require: true,
    },
    Data_FIN: {
        type: String,
        require: true,
    },

})