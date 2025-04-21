const mongoose = require('mongoose');

const DonateSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    typeoffood:{
        type:String
    },
    foodcondition:{
        type:String
    },
    quantity:{
        type:Number
    },
    various:{
        type:String
    },
    instructions :{
        type:String
    },
    location:{
        type:String
    },
    pincode:{
        type:Number
    },
    date:{
        type: String,
    },
    status:{
        type:String,
        default:'pending'
    },
    role:{
        type:String
    },
    image: [String],
    accepted_user:{
        type: Object,
        default: { email: 'default@nourish.com' }
    },
    Donation:{
        type:Boolean,
        default:true
    }
})

const Donate = new mongoose.model('Donation',DonateSchema);

module.exports = Donate;
