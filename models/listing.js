const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    // filename: String,
    // url: String,
    
    filename: {
      type: String,
      default: "listingsimage"
    },
    url: {
      type: String,
       default: "https://images.unsplash.com/photo-1747738304810-5cb89f585299?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Reviews",
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:'User',
  }
});

ListingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
  await Review.deleteMany({_id : {$in: listing.reviews}})
    }
})

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
