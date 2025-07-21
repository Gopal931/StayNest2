const express=require('express');
const router=express.Router();
const wrapAsync = require('../utils/wrapAsync');  // // to wrap async functions and catch errors
const ExpressError = require('../utils/ExpressError'); // custom error handling class
const {listingSchema,reviewSchema} =require("../schema.js")
const Listing=require('../models/listing.js');
const {isLoggedIn, isOwner,validateListing}=require('../middleware.js');
const listingController=require('../controllers/listing.js');
const multer=require('multer');
const {storage}=require('../cloudConfig.js')
const upload=multer({storage,limits: { fileSize: 10 * 1024 * 1024 },})

router.route('/')
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('image'),validateListing,wrapAsync(listingController.createListing))
//upload.single('listing[image]'),
// .post(upload.single('image'),(req,res)=>{
//     res.send(req.file);
// });

//New Route   (always first incompare to Show Route)  other wise /new intereprate as id.
router.get('/new',isLoggedIn,listingController.renderNewForm)

router.route('/:id')
.get(wrapAsync(listingController.showListings))
.put(isLoggedIn,isOwner,upload.single('image[url]'),wrapAsync(listingController.updateListing))
.delete(isOwner,wrapAsync(listingController.destroyListing))



//router.get('/', wrapAsync(listingController.index));

//(show Route) for individual listing
//router.get('/:id',wrapAsync(listingController.showListings));


//create route
//router.post('/',isLoggedIn,validateListing,wrapAsync(listingController.createListing));

//Edit Route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm)); 


//Update Route
//router.put('/:id',isLoggedIn,isOwner,wrapAsync(listingController.updateListing));


//Delete Route
//router.delete('/:id',isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;