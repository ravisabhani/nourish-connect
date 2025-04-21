const  validate = (Signup) => async (req,res,next) => {
    try {
        const parsebody = await Signup.parseAsync(req.body);
        req.body = parsebody;
        next();
    } catch (e) {
        
        const error = {
            status:400,
            message:"fill the input properly",
            extradetails:e.errors[0].message
        }

        next(error)
    }
}

module.exports = validate