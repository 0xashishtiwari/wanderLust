const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync');
const listingController = require('../controllers/listing');
const {isLoggedIn , validateListing ,isOwner , uploadImage } = require('../middleware');
const multer  = require('multer')
const {storage} = require('../cloudConfig');
const upload = multer({ storage })



//--------------INDEX ROUTE------------------
//----------Create ROUTE------------------------
router.route('/')
.get( wrapAsync(listingController.index))
.post(isLoggedIn,validateListing , upload.single('listing[image]') , wrapAsync(listingController.createListing));




//---------------New Listings Route------------
router.get('/new',isLoggedIn , listingController.renderNewForm);




//--------------SHOW ROUTE---------------------
//--------------UPDATE ROUTE----------------------
//-------------DELETE ROUTE-----------------------
router.route('/:id')
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn ,isOwner, validateListing ,upload.single('listing[image]'), wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));





//-------------Edit ROUTE-------------------------

router.get('/:id/edit',isLoggedIn ,isOwner, wrapAsync(listingController.renderEditForm));







module.exports = router;