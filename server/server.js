require('dotenv').config();

const express = require ('express');
const app = express();
const cors = require('cors');

const corsoption = {
    origin : "http://localhost:5173",
    methods :"GET,POST,PUT,DELETE,HEAD",
    credentials:true
}

app.use(cors(corsoption));

const port = 5000 ;

// handle cors


const errormiddleware = require('./middleware/error-middleware');
const connects = require('./db/conn');


app.use(express.json());

const router = require('./router/auth-routerr');

app.use('/',router);
app.use(errormiddleware);

connects().then(()=>{
    app.listen(port,() =>{
        console.log(`server run on port ${port}`)
    }
    )
})