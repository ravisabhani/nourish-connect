const Donatemodel =  require('../model/donate-model');
const Usermodel =  require('../model/user-model');
const Contactmodel =  require('../model/contact-model');
const reviewmodel = require('../model/review-model')
const reviews = require('../model/review')

const cron = require('node-cron');
const moment = require('moment');


const home = async (req,res) =>{
    try{
        res
        .status(200)
        .send('hello jash how are you')
    }catch(error){
        console.log(error)
    }
}

const User = async (req,res) =>{
    try {
        const { name, email, phone, pincode, role, password, isadmin } = req.body;

        const profilePicPath = req.file ? req.file.path : null;
        const profilePic = profilePicPath ? profilePicPath.replace('client/public/', '') : null;

        const userExist = await Usermodel.findOne({ $or: [{ email }, { phone }] });

        if (userExist) {
            return res.status(400).json({ msg: 'User Already Exists.' });
        }

        const userdetail = await Usermodel.create({ name, email, phone, pincode, role, password, isadmin, profilePic });

        res.status(200).json({ msg:'Registration Successfully..!', token: await userdetail.generateToken(), userid: userdetail._id });

    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}


const signin = async (req,res) =>{
    try{
        const { email , password } = req.body

        const findemail = await Usermodel.findOne({email});
        
        if(!findemail){
            return res.status(400).json({msg:'Invaild Credentials'})
        }
        
        const passwoedcom = await findemail.comparepass(password);

        if(passwoedcom){
            res.status(200).json({msg: 'Login Successful' , token: await findemail.generateToken() , userid :findemail._id});
        }else{
            res.status(400).json({msg : 'Invalid Email Or Password'});
        }

    }catch(error){
        console.log(error);
    }
}



const contact = async (req,res) =>{
    try{
        const {users,date} = req.body
        const {name,email,phone,message,role,profilePic} = users

        if(!message){
            res.status(401).json({msg:'Message Required'})
        }

        const contactDEtails = await Contactmodel.create({name,email,phone,message,role,date,profilePic});
        
        res
        .status(200)
        .json({msg : 'Message Send Successful ..!'});

    }catch(e){
        console.log(e);
    }
}


// for user email phone name data
const getdata = async (req,res) =>{
    try {
        const userdata = req.user;
        res.status(200).json({msg:userdata});
    } catch (error) {
        console.log(error);
    }
}

const Donate = async (req,res) =>{
    try {
        const image = req.files.map(file => file.path);

        const {name,email,phone,location,pincode,typeoffood,foodcondition,various,quantity,instructions,role,date} = req.body;

        if (!name || !email || !phone || !location || !pincode || !typeoffood || !foodcondition || !various || !quantity || !instructions || !role || image.length === 0) {
            res.status(400).json({ msg: 'Fill All Data !' });
        } else {
            await Donatemodel.create({ name, email, phone, location, pincode, typeoffood, foodcondition, various, quantity, instructions, role, image ,date});
            res.status(200).json({ msg: 'Donation created successfully!' });
        }
        
    } catch (error) {
        console.error('Error uploading file: ', error);
        res.status(500).send('Server error');
    }
}

// for dashboard/active
const active_donation = async (req,res) =>{
    try {
        const userEmail = req.query.email;
        const donations = await Donatemodel.find({ email: { $ne: userEmail }, status: "pending" , Donation:true});

        res.status(200).json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


const detail_donation = async (req,res) =>{
    try {
        const id = req.params.id;
        const data = await Donatemodel.findOne({ _id : id });

        const email = data.email

        const reviews = await reviewmodel.find({ email });

        const senderEmails = reviews.map(review => review.sender);     

        const senders = await Usermodel.find({ email: { $in: senderEmails } });

        const mergedData = reviews.map(review => {
            const sender = senders.find(sender => sender.email === review.sender);
            const senderName = sender ? sender.name : "Unknown";
            return {
                review: review,
                senderName: senderName
            };
        });


        if (data ) {
            res.status(200).json({data,mergedData}); 
        } else {
            res.status(404).json({ message: 'Data not found' }); 
        }
        
    } catch (error) {
        console.log(error);
    }
}

const update_status = async (req,res) =>{
    try {
        const { id } = req.params;
        const { status, accepted_user } = req.body;

        if (!status || !accepted_user) {
            return res.status(400).json({ msg: "You Can't Accepted ..!" });
        }

        await Donatemodel.findByIdAndUpdate(id, { status, accepted_user });

        res.status(200).json({ msg: 'Donation Accepted ..!' });
    } catch (error) {
        console.error('Error updating status and accepted email:', error);
        res.status(500).json({ msg: 'Server error' });
    }
}

cron.schedule('0 */2 * * *', async () => {
    try {
        const twoHoursAgo = moment().subtract(2, 'hours').toDate();
        const donations = await Donatemodel.find({ status: 'pending', date: { $lte: twoHoursAgo } });
        
        for (const donation of donations) {
            donation.status = 'expired';
            await donation.save();
        }
    } catch (error) {
        console.error('Error updating expired donations:', error);
    }
});

const manage = async (req, res) => {
    try {
        const userEmail = req.query.email;

        const donations = await Donatemodel.find({ 
            email: userEmail,
            Donation:true,
            $or: [
                { status: "pending" },
                { status: "accepted" }
            ]
        });

        if (donations.length === 0) {
            return res.status(400).json({ message: "No donations found for the provided email" });
        }
    
        const acceptedDonations = donations.filter(donation => donation.status === "accepted");
    
        let acceptedUserDetails = {}; 
        if (acceptedDonations.length > 0) {
            const acceptedUserEmails = acceptedDonations.map(donation => donation.accepted_user);
            acceptedUserDetails = await Usermodel.find({ email: { $in: acceptedUserEmails } }, { name: 1, phone: 1, _id: 0 ,email:1});
        }
        
        const updatedDonations = donations.map(donation => {
            if (donation.status === "accepted") {
                const acceptedUserData = acceptedUserDetails.filter(users => users.email === donation.accepted_user);
                donation.accepted_user = acceptedUserData.length > 0 ? acceptedUserData[0] : {};
            }
            return donation;
        }).reverse(); 
    
        res.status(200).json(updatedDonations);
        console.log(updatedDonations)
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const deletedonation = async (req,res) =>{
    try {
        const { id } = req.params;
        const { Donation } = req.body;

        if (Donation) {
            return res.status(400).json({ msg: 'Donation not Cancelled !' });
        }

        await Donatemodel.findByIdAndUpdate(id, { Donation , status:'expired' });

        res.status(200).json({ msg: 'Donation Cancelled.' });
    } catch (error) {
        console.error('Error updating status and accepted email:', error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const accepted = async (req,res) =>{
    try {
        const useremail = req.query.email
        
        const donations = await Donatemodel.find({ 
            accepted_user: useremail,
        });
        
        res.status(200).json(donations)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const deleteaccepted = async (req,res) =>{
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: 'Accepted Donation Not Deleted !' });
        }

        await Donatemodel.findByIdAndUpdate(id, { accepted_user: 'default@nourish.com', status: 'pending' });

        res.status(200).json({ msg: 'Accepted Donation Cancelled.' });
    } catch (error) {
        console.error('Error updating status and accepted email:', error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const reviewfordonor = async (req,res) =>{
    try {
        const {id}  = req.params;
        const { userreview ,status,sender,email,rating} = req.body;

        if (!email || !userreview || !rating) {
            return res.status(400).json({ msg: 'Please add Reviews !' });
        }else{
            await Donatemodel.findByIdAndUpdate(id, { status});
            await reviewmodel.create({email,userreview,sender,rating});
        }

        res.status(200).json({ msg: 'Successfully ..!' });
    } catch (error) {
        console.error('Error updating status and accepted email:', error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const history = async (req,res) =>{
    try {
        const useremail = req.query.email

        const donations = await Donatemodel.find({ 
            email: useremail,
        }).sort({_id: -1});;
        
        res.status(200).json(donations)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const reviewuser = async (req, res) => {
    try {
        const { email } = req.params;
        const { review,rating,profilePic } = req.body;

        await reviews.create({ email, review ,rating,profilePic});

        res.status(200).json({ msg: 'Review added successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Failed to add review' });
    }
};


const dashboard_data = async (req,res) =>{
    const email = req.query.email
    
    try {
        const totaldonation = await Donatemodel.aggregate([
            { $match: { email: email } },
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$date",
                            format: "%d/%m/%Y, %H:%M:%S"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalData: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    totalData: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]);
        
        const quantity = await Donatemodel.aggregate([
            { $match: { email: email } },
            { $group: { _id: "$various", totalQuantity: { $sum: "$quantity" } } },
            { $sort: { totalQuantity: -1 } },
            { $limit:5 } 
        ]);
        
        
        const status = await Donatemodel.aggregate([
            { $match: { email: email } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        
        const typefood = await Donatemodel.aggregate([
            { $match: { email: email } },
            { $group: { _id: "$typeoffood", totalQuantity: { $sum: 1 } } }
        ]);
        
        const mergedResult = {
            status: status,
            totaldonation: totaldonation,
            typefood: typefood,
            quantity: quantity
        };
        
        res.status(200).json(mergedResult);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


const adminusers = async (req,res) =>{
    try {
        const userdata = await Usermodel.find({},{password:0});

        if(!userdata || userdata.length === 0){
            return res.status(404).json({msg:'no recode found'})
        }

        return res.status(201).json({userdata}); 

        } catch (error) {
        console.log(error)
    }
}

const deleteuserdata = async (req,res) =>{
    try {
        const id = req.params.id
        await Usermodel.deleteOne({_id:id})
        
        return res.status(201).json({msg:"User Deleted Successful"});
    } catch (error) {
        console.log(error);
    }
}

const getdonation = async (req,res) =>{
    try {
        const donationdata = await Donatemodel.find({}).lean();
    
        if (!donationdata || donationdata.length === 0) {
            return res.status(404).json({ msg: 'no record found' });
        }
    
        // Fetch additional user data based on email address and merge into donationdata
        for (const donation of donationdata) {
            const user = await Usermodel.findOne({ email: donation.email }).lean();
            if (user && user.profilePic) {
                donation.profilePic = user.profilePic;
            }
        }
    
        // Check if profilePic is added correctly to each donationdata object
        // console.log(donationdata);
    
        return res.status(201).json({ donationdata });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
    
}    

const viewitem = async (req,res) =>{
    try {
        const donationId = req.params.id;

        const viewitemdata = await Donatemodel.findById(donationId);
        if (!viewitemdata) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json({ viewitemdata });
    } catch (error) {
        console.error('Error fetching donation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getreview = async (req,res) =>{
    try {
        const reviewdata = await reviews.find({});

        if(!reviewdata || reviewdata.length === 0){
            return res.status(404).json({msg:'No Recode Found'})
        }

        return res.status(201).json({reviewdata}); 

        } catch (error) {
        console.log(error)
    }
}

const deletereview = async (req,res) =>{
    try {
        const id = req.params.id
        await reviews.deleteOne({_id:id})
        
        return res.status(201).json({msg:"Review Deleted Successful"});
    } catch (error) {
        console.log(error);
    }
}


const getquery = async (req,res) =>{
    try {
        const Contactdata = await Contactmodel.find({}).sort({_id:-1});
        
        if(!Contactdata || Contactdata.length === 0){
            return res.status(404).json({msg:'no recode found'})
        }
        
        return res.status(201).json({Contactdata}); 
        
    } catch (error) {
        console.log(error)
    }
}

const getqueryitem = async (req,res) =>{
    try {
        const donationId = req.params.id;

        const viewitemdata = await Contactmodel.findById(donationId);
        if (!viewitemdata) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json({ viewitemdata });
    } catch (error) {
        console.error('Error fetching donation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const admin_data = async (req,res) =>{
    
    try {
        const totaldonation = await Donatemodel.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$date",
                            format: "%d/%m/%Y, %H:%M:%S"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalData: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    totalData: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]);

        const totalyeardonation = await Donatemodel.aggregate([
            { 
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$date",
                            format: "%d/%m/%Y, %H:%M:%S"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: { year: { $year: "$date" } },
                    totalDates: { $sum: 1 } 
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year", // Rename _id.year to year
                    totalDates: 1
                }
            },
            {
                $sort: { year: 1 } // Sort by year
            }
        ]);

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-based, so January is 0, February is 1, etc.
        
        const totalcurrentmonth = await Donatemodel.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$date",
                            format: "%d/%m/%Y, %H:%M:%S"
                        }
                    }
                }
            },
            {
                $match: {
                    $expr: { $eq: [{ $month: "$date" }, currentMonth] }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalData: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    totalData: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]);
        

        const currentDates = new Date();
        const currentMonths = currentDates.getMonth() + 1; 
        const lastMonth = currentMonths === 1 ? 12 : currentMonths - 1; 
        const lastYear = currentMonths === 1 ? currentDates.getFullYear() - 1 : currentDates.getFullYear(); 

        const totalLastMonth = await Donatemodel.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$date",
                            format: "%d/%m/%Y, %H:%M:%S"
                        }
                    }
                }
            },
            {
                $match: {
                    $expr: { $and: [{ $eq: [{ $month: "$date" }, lastMonth] }, { $eq: [{ $year: "$date" }, lastYear] }] }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalData: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    totalData: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]);


        const quantity = await Donatemodel.aggregate([
            { $group: { _id: "$various", totalQuantity: { $sum: "$quantity" } } },
            { $sort: { totalQuantity: -1 } },
            { $limit:5 } 
        ]);
        
        
        const status = await Donatemodel.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        
        const typefood = await Donatemodel.aggregate([
            { $group: { _id: "$typeoffood", totalQuantity: { $sum: 1 } } }
        ]);
        
        const mergedResult = {
            status: status,
            totaldonation: totaldonation,
            typefood: typefood,
            quantity: quantity,
            totalyear:totalyeardonation,
            currentmonth:totalcurrentmonth,
            lastmonth:totalLastMonth
        };
        
        res.status(200).json(mergedResult);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {admin_data,getquery,getqueryitem,deletereview,getreview,viewitem,getdonation,deleteuserdata,adminusers,dashboard_data,reviewuser,home,Donate,User,signin,contact,getdata,active_donation,detail_donation,update_status,manage,deletedonation,accepted,deleteaccepted,reviewfordonor,history}