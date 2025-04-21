const {Schema , model , default: mongoose} = require('mongoose');

const constSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    message:{type:String,required:true},
    role:{type:String,required:true},
    date:{type:String},
    profilePic:{type:String}
})


const UserQuery = new model('Contact',constSchema);

module.exports = UserQuery;