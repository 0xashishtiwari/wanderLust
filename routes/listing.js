const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync');
const Listing  = require('../models/listing');
const ExpressError = require('../utils/ExpressError');
const listingController = require('../controllers/listings');
const {isLoggedIn , validateListing ,isOwner } = require('../middleware');




//--------------INDEX ROUTE------------------
//----------Create ROUTE------------------------
router.route('/')
.get( wrapAsync(listingController.index))
.post(isLoggedIn,validateListing , wrapAsync(listingController.createListing));



//---------------New Listings Route------------
router.get('/new',isLoggedIn , listingController.renderNewForm);




//--------------SHOW ROUTE---------------------
//--------------UPDATE ROUTE----------------------
//-------------DELETE ROUTE-----------------------
router.route('/:id')
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn ,isOwner, validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));





//-------------Edit ROUTE-------------------------

router.get('/:id/edit',isLoggedIn ,isOwner, wrapAsync(listingController.renderEditForm));







module.exports = router;