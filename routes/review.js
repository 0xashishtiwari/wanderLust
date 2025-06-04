const express = require('express');
const router = express.Router({mergeParams : true});
const ExpressError = require('../utils/ExpressError');
const {Review} = require('../models/review');
const {reviewSchema} = require('../schema');
const wrapAsync = require('../utils/WrapAsync');
const Listing = require('../models/listing');
const { validateReview, isLoggedIn , isreviewAuthor} = require('../middleware');

//--------------Review POST Route------------------------

router.post('/' ,isLoggedIn ,validateReview ,  wrapAsync( async(req , res)=>{
   
    let {id} = req.params
    let listing =  await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash('success'  , 'New Review Added!')
    res.redirect(`/listings/${id}`);
}));


//------------DELETE Review Route----------------------

router.delete('/:reviewId' ,isLoggedIn, isreviewAuthor,wrapAsync(async(req ,res)=>{
    let {id , reviewId} = req.params; 
    Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}}); // removing data from the listing review array using $pull
    await Review.findByIdAndDelete(reviewId);
     req.flash('success'  , ' Review Deleted!')
    res.redirect(`/listings/${id}`);
}));


module.exports = router;
