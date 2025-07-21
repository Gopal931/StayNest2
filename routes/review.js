const express=require('express');
const router=express.Router({ mergeParams: true });    //without mergeParams id.params return undefine.
const ExpressError = require('../utils/ExpressError'); // custom error handling class
const wrapAsync = require('../utils/wrapAsync'); 
const Review=require('../models/reviews.js') 
const Listing=require('../models/listing.js');
const {validateReview, isLoggedIn,isReviewAuthor}=require('../middleware.js');

const reviewController=require('../controllers/review.js');

//Reviews (Post Rout)
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//Delete Review Rout
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,reviewController.destroyRout);

module.exports=router;