const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./records').Users; 

const feedbackSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, ref:'User'
    },
    rating: {
        type:Number
    },
    category: {
        type:String
    },
    feedback: {
        type:String
    }
},{
    timestamps:true
})

var Feedbacks = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedbacks;