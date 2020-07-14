const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./records').Users; 

const reservationSchema = new Schema({
     user:{type: Schema.Types.ObjectId, ref:'User'},
    dob: {                 
      type: Date
     },                
    st: {               
        type: Date,
     },
    et: {                   
        type: Date,
     },
    purpose: {
        type: String
    },
    nop:{                   
        type: String,
        required: true
    },
    approvalStatus: {   
        type: Boolean,
        default:false 
    },
    responded:{
        type: Boolean,
        default:false
    },
    recurring:[Number],
    recurringEndDate:{
        type:Date
    }
},{
    timestamps:true
});


var Reservations = mongoose.model('Reservation', reservationSchema);

module.exports = Reservations;