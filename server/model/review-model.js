const {Schema , model , default: mongoose} = require('mongoose');

const reviewschema = new Schema({
    email:{type:String,required:true},
    userreview:{type:String,required:true},
    sender:{type:String,required:true},
    rating:{type:Number,required:true}
})


const reviewmodel = new model('review_for_donor',reviewschema);

module.exports = reviewmodel;