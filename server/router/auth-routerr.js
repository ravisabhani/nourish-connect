const express = require ('express');
const router = express.Router();
const auth = require('../controller/auth-controler')
const authmiddleware = require('../middleware/authmiddleware');

const validate = require('../middleware/validate-middleware')
const validateSchema = require('../validatoer/auth-validation');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, '../client/public/donate_image/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        return cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });



const storages = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, '../client/public/profile/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        return cb(null, uniqueSuffix + file.originalname);
    }
});

const uploads = multer({ storage: storages });



router.route('/').get(auth.home)
router.post('/signup', uploads.single('profilePic'),validate(validateSchema) ,auth.User)
router.route('/signin').post(auth.signin)

router.route('/contact').post(auth.contact)
router.route('/user').get(authmiddleware,auth.getdata)

router.post('/dashboard/newdonation', upload.array('files'), auth.Donate)
router.route('/active_donation').get(auth.active_donation)
router.route('/dashboard/detail/:id').get(auth.detail_donation)
router.route('/update_status/:id').put(auth.update_status)
router.route('/donation/deletedonation/:id').put(auth.deletedonation)
router.route('/manage').get(auth.manage)
router.route('/dashboard/accept').get(auth.accepted)
router.route('/donation/deleteaccepted/:id').put(auth.deleteaccepted)
router.route('/reviewfordonor/:id').put(auth.reviewfordonor)
router.route('/dashboard/history').get(auth.history)
router.route('/dashboard/home').get(auth.dashboard_data)
router.route('/reviewuser/:email').post(auth.reviewuser)

// admin

router.route('/admin/user').get(authmiddleware,auth.adminusers)
router.route('/admin_user/delete/:id').delete(authmiddleware,auth.deleteuserdata)
router.route('/admin/donation').get(authmiddleware,auth.getdonation)
router.route('/admin/viewitem/:id').get(auth.viewitem)
router.route('/admin/reviewmanage').get(authmiddleware,auth.getreview)
router.route('/review/delete/:id').delete(authmiddleware,auth.deletereview)

router.route('/admin/home').get(auth.admin_data)
router.route('/admin/query').get(authmiddleware,auth.getquery)
router.route('/admin/queryitem/:id').get(auth.getqueryitem)

module.exports = router;