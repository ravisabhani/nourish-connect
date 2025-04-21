const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');

const signupSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    pincode:{
        type:String
    },
    role:{
        type:String
    },
    password:{
        type:String
    },
    isadmin:{
        type:String,
        default:'false'
    },
    profilePic: {
        type: String 
    }
})

signupSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')){
        next();
    }

    try {
        const hash_password = await bcrypt.hash(user.password,10);
        user.password = hash_password;
        next();
    } catch (error) {
        next(error)
    }
})


signupSchema.methods.generateToken =  async function(){
    try {
        
        return jwt.sign({
            userid: this._id,
            email:this.email,
        },
            process.env.jwt_key,
        );

    } catch (error) {
        console.log(error)
    }
}

signupSchema.methods.comparepass =  async function(password){
    return bcrypt.compare(password,this.password);
}

const User = new mongoose.model('register',signupSchema);

module.exports = User;
