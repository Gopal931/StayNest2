const express=require('express');
const router=express.Router();    //without mergeParams id.params return undefine.
const ExpressError = require('../utils/ExpressError'); // custom error handling class
const wrapAsync = require('../utils/wrapAsync'); 
const User=require('../models/user.js');
const passport = require('passport');
const { saveRediractUrl } = require('../middleware.js');
  const userController=require('../controllers/user.js');

router.get('/signup',userController.renderSignupForm);
router.post('/signup',wrapAsync(userController.signup));

router.get('/login',userController.renderLoginForm)

router.post('/login',saveRediractUrl,passport.authenticate('local',{ failureRedirect: '/login',failureFlash:true }),userController.login)

router.get('/logout',userController.logout);

module.exports=router;