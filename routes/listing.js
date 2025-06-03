const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync');
const Listing  = require('../models/listing');
const ExpressError = require('../utils/ExpressError');
const {listingSchema} = require('../schema');


//---------------validation fucntion-------------

const validateListing = (req , res , next)=>{
   let {error} =listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(" ");
      throw new ExpressError(400 , errMsg);
    }else{
      next();
    }
};

//--------------INDEX ROUTE------------------


router.get('/' , wrapAsync(async (req , res)=>{
   const allListings = await Listing.find({});
   res.render('listings/index.ejs' , {allListings} );
  //  console.log(result);
}));

//---------------New Listings Route------------

router.get('/new' , (req ,res)=>{
  res.render('listings/new.ejs');
});



//--------------SHOW ROUTE---------------------

router.get('/:id' , wrapAsync(async (req ,res)=>{
  let {id} = req.params;
  const listing  =  await Listing.findById(id).populate('reviews');
  if(!listing){
    req.flash("error" , "Listing you requested for does not exist");
    res.redirect('/listings');
  }else{

    res.render('listings/show.ejs' , {listing});
  }

  
}));



//----------Create ROUTE------------------------

router.post('/' ,validateListing , wrapAsync(async(req ,res ,next)=>{
   
    
   const newListing = new Listing(req.body.listing); 
   await newListing.save();
   req.flash('success' , "New Listing created!")
   res.redirect('/listings');
}));


//-------------Edit ROUTE-------------------------

router.get('/:id/edit' , wrapAsync(async(req , res)=>{

    let {id} = req.params;
    let listing = await Listing.findById(`${id}`);
    if(!listing){
    req.flash("error" , "Listing you requested for does not exist");
    res.redirect('/listings');
  }else{

    res.render('listings/edit.ejs' , {listing});
  }
}));

//--------------UPDATE ROUTE----------------------
router.put('/:id' ,validateListing, wrapAsync(async(req , res)=>{
     let {id} = req.params;
    await Listing.findByIdAndUpdate(id , req.body.listing);
     req.flash('success' ,'Listing Updated!')
    res.redirect(`/listings/${id}`);
}));



//-------------DELETE ROUTE-----------------------

router.delete('/:id' , wrapAsync(async(req , res)=>{
   let {id} = req.params;
  let deletedListing =  await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash('success' ,'Listing Deleted!')
   res.redirect('/listings');
}));


module.exports = router;