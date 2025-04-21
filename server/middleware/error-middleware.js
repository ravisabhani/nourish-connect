const errormiddleware = (err , req, res, next) =>{

    const status = err.status || 500;
    const message = err.message || "error";
    const extradetails = err.extradetails || "error form backend"

    return res.status(status).json({message,extradetails})
}

module.exports = errormiddleware;