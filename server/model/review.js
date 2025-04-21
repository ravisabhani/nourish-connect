const {Schema , model , default: mongoose} = require('mongoose');

const reviews = new Schema({
    email:{type:String,required:true},
    review:{type:String,required:true},
    rating:{type:Number,required:true},
    profilePic:{type:String}
})


const review = new model('Feedback',reviews);

module.exports = review;