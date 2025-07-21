const Listing=require("../models/listing");

module.exports.index=async(req,res)=>{
  const allListings= await Listing.find({});
//   console.log(allListings);
     res.render("./listings/index.ejs",{allListings})
}
module.exports.renderNewForm=(req,res)=>{
   res.render('./listings/new.ejs')
}

module.exports.showListings=async(req,res)=>{
    //console.log(req.params);   //object with id as key.
    const {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate('owner');
    if(!listing) {
          req.flash("error","Listing you requested for does not exist!");
          res.redirect('/listings');
    }
    console.log(listing);
    res.render('./listings/show.ejs',{listing})
};
module.exports.createListing=async(req,res,next)=>{
       const urll=req.file.path;
      const filenamee=req.file.filename;
   const { image, ...rest } = req.body;
   const newListing = new Listing(rest);
  // if (image && image.trim() !== '') {
  newListing.image = {
    //url: image.trim(),
    url:urll,
    //filename: 'custom-url-upload'  // optional, or leave undefined
    filename:filenamee,
  //};
}

   //set owner
   newListing.owner = req.user._id;
     await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect('/listings');
    
}

module.exports.renderEditForm=async(req,res)=>{
    const {id}=req.params;
     //find the listing by id
    const listing=await Listing.findById(id);
    if(!listing){
          req.flash("error","Listing you requested for does not exist!");
          res.redirect('/listings');
    }
     res.render('listings/edit.ejs', {listing});
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    //find the listing by id and update it
    let updatedListing =await Listing.findByIdAndUpdate(id, req.body, {
        new: true, // this will return the updated document
        runValidators: true // this will run the validators on the updated document
    });
     if(req.file){
    updatedListing.image = {
  url: req.file.path,
  filename: req.file.filename
};

    await updatedListing .save();
}
   // res.redirect(`/listings/${updatedListing._id}`);    //direct use `/listings/${id}`
    req.flash("success"," List Updated Successfully!");
   res.redirect(`/listings`);
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    const deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted");
    res.redirect('/listings');
}