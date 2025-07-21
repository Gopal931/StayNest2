const { model } = require('mongoose');
const Listing=require('../models/listing.js')
const Review=require('../models/reviews.js')

module.exports.createReview=async(req,res)=>{
   
    let listing=await Listing.findById(req.params.id);

    let newReview= new Review(req.body.review || {}) ;
    newReview.author=req.user._id;
    listing.reviews.push(newReview) //review object as comment and rating .
    console.log(newReview);
    await newReview.save();
    await listing.save();
     req.flash("success","New Review Created!");
  res.redirect(`/listings/${listing._id}`)

}
module.exports.destroyRout=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);
}