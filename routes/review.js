const express = require('express');
const router = express.Router({mergeParams : true});
const ExpressError = require('../utils/ExpressError');
const {Review} = require('../models/review');
const {reviewSchema} = require('../schema');
const wrapAsync = require('../utils/WrapAsync');
const Listing = require('../models/listing');
const { validateReview, isLoggedIn , isreviewAuthor} = require('../middleware');
const reviewController = require('../controllers/reviews')



//--------------Review POST Route------------------------

router.post('/' ,isLoggedIn ,validateReview ,  wrapAsync(reviewController.createReview ));



//------------DELETE Review Route----------------------

router.delete('/:reviewId' ,isLoggedIn, isreviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports = router;
