const express = require('express');
const router = express.Router({mergeParams : true});
const ExpressError = require('../utils/ExpressError');
const {Review} = require('../models/review');
const {reviewSchema} = require('../schema');
const wrapAsync = require('../utils/WrapAsync');
const Listing = require('../models/listing');


//----------server side schema validation

const validateReview = (req  ,res , next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
      let errmsg = error.details.map((el)=>el.message).join(' ');
      throw new ExpressError(400 , errmsg);

    }else{
      next();
    }
}


//--------------Review POST Route------------------------

router.post('/' ,validateReview ,  wrapAsync( async(req , res)=>{
   
    let {id} = req.params
    let listing =  await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${id}`);
}));


//------------DELETE Review Route----------------------

router.delete('/:reviewId' , wrapAsync(async(req ,res)=>{
    let {id , reviewId} = req.params; 
    Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}}); // removing data from the listing review array using $pull
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));


module.exports = router;
