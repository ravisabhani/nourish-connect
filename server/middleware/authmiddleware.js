const jwt = require('jsonwebtoken');
const User = require('../model/user-model');

const authmiddleware = async (req,res,next) =>{
    const token = req.header('Authorization');

    if(!token){
        return res .status(401).json({msg:"token not provider"});
    }

    const jwttoken = token.replace('Bearer',"").trim();

    try {
        const isverify = jwt.verify(jwttoken, process.env.jwt_key);
        const userdata = await User.findOne({email:isverify.email}).select({password:0})

        req.user = userdata;
        req.token = token;
        req.userid = userdata._id;

    } catch (error) {
        return res.status(401).json({msg:'Unauthorized , invaild token'});
    }
    next();
}

module.exports = authmiddleware;