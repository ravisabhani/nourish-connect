const {z} = require("zod");

const Signup = z.object({
    name:z
        .string({required_error : 'Name is Required'})
        .trim()
        .min(3,{message:'name must be at least of 2 chars'})
        .max(15,{message:'name must not be more than 15 chars'}),
    email:z
        .string({required_error : 'Email is Required'})
        .trim()
        .min(3,{message:'email must be at least of 2 chars'})
        .max(50,{message:'email must not be more than 50 chars'})
        .email({message:'Invalid email address'}),
    phone:z
        .string({required_error : 'phone is Required'})
        .min(10,{message:'phone must be at least of 10 chars'}),
    pincode:z
        .string({required_error : 'Name is Required'}),
    role:z
        .string({required_error : 'Select Donor & Volunteer'}),
    password:z
        .string({required_error : 'password is Required'})
        .trim()
        .min(3,{message:'password must be at least of 3 chars'})
        .max(10,{message:'password must not be more than 10 chars'}),
})


module.exports = Signup;