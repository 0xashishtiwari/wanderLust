const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync');
const Listing  = require('../models/listing');
const ExpressError = require('../utils/ExpressError');
const listingController = require('../controllers/listing');
const {isLoggedIn , validateListing ,isOwner } = require('../middleware');


//--------------INDEX ROUTE------------------


router.get('/' , wrapAsync(listingController.index));


//---------------New Listings Route------------

router.get('/new',isLoggedIn , listingController.renderNewForm);



//--------------SHOW ROUTE---------------------

router.get('/:id' , wrapAsync(listingController.showListing));



//----------Create ROUTE------------------------

router.post('/' ,isLoggedIn,validateListing , wrapAsync(listingController.createListing));


//-------------Edit ROUTE-------------------------

router.get('/:id/edit',isLoggedIn ,isOwner, wrapAsync(listingController.renderEditForm));


//--------------UPDATE ROUTE----------------------
router.put('/:id' ,isLoggedIn ,isOwner, validateListing, wrapAsync(listingController.updateListing));



//-------------DELETE ROUTE-----------------------

router.delete('/:id' ,isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));


module.exports = router;