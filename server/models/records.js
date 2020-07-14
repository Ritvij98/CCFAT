const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Reservation = require("./reservations");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String
        
    },
    institute: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin:{
        type:Boolean,
        default:false
    },
    reservations:[{type: Schema.Types.ObjectId, ref:'Reservation'}]
},{
    timestamps: true
}) ;


const instiSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});


const deptSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    institute: {
        type: String,
        required: true
    }
},{
    timestamps: true
});



// const reservationSchema = new Schema({
//     dob: {                  // dob : Booked slot date
//       type: Date,
//       required: true  
//     },                
//     st: {                   // st: start time
//         type: Date,
//         required: true
//     },
//     et: {                   // et: end time
//         type: Date,
//         required: true
//     },
//     purpose: {
//         type: String
//     },
//     nop:{                   // nop: number of participants
//         type: String,
//         required: true
//     },
//     approvalStatus: {       //same as lab alloted? [0  1  2  3]
//         type: Boolean  
//     }
   
// },{
//     timestamps:true
// });



 userSchema.plugin(passportLocalMongoose,{
    usernameField: 'email',
    usernameLowerCase: true,
    session: false
  });

var Users = mongoose.model('User', userSchema);
var Departments = mongoose.model('Department',deptSchema);
var Institutes = mongoose.model('Institutes',instiSchema);

module.exports = { 
Users: Users,
Departments : Departments,
Institutes:Institutes
}
