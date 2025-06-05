const express = require('express');
const router = express.Router();
const passport = require('passport');
const { saveRedirectUrl} = require('../middleware');
const WrapAsync = require('../utils/WrapAsync');
const userController = require('../controllers/users');


router.route('/signup')
.get( userController.renderSignUpForm)
.post( WrapAsync(userController.signup));

router.route('/login')
.get( userController.rederloginForm)
.post(saveRedirectUrl , passport.authenticate("local" , {failureRedirect : '/login' , failureFlash : true}) ,userController.login)


router.get('/logout' , userController.logout)

module.exports = router;