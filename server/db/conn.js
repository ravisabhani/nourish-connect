const mongoose = require('mongoose');

const url = process.env.url;


const con = async () =>{
    try {
        await mongoose.connect(url);
        console.log('Database Connected');
    } catch (error) {
        console.log('connection failed');
    }
}

module.exports = con