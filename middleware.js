const Listing = require('./models/listing');
const WrapAsync = require('./utils/WrapAsync');
const {listingSchema,  reviewSchema} = require('./schema');
const ExpressError = require('./utils/ExpressError');
const {Review}  = require('./models/review');
 
module.exports.isLoggedIn = (req, res , next)=>{
    // console.log(req.path ,"  " , req.originalUrl);
    if(!req.isAuthenticated()){
        //agar user logged in nahi h to OriginalUrl pe jayenge login ke baad
        req.session.redirectUrl = req.originalUrl;
         req.flash('error', " You must be loggedIn!");
        return res.redirect('/login');
    }else{
        next();
    }
}


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = WrapAsync(async(req,res,next)=>{
     let {id} = req.params;
    let listing = await Listing.findById(id);
   
    if(!listing.owner._id.equals(req.user._id)){
      req.flash("error", "You are not the owner of this listing!");
      return res.redirect(`/listings/${id}`);
    }
    next();
})


//---------------validation fucntion-------------

module.exports.validateListing = (req , res , next)=>{
   let {error} =listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(" ");
      throw new ExpressError(400 , errMsg);
    }else{
      next();
    }
};



//----------server side schema validation

module.exports.validateReview = (req  ,res , next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
      let errmsg = error.details.map((el)=>el.message).join(' ');
      throw new ExpressError(400 , errmsg);

    }else{
      next();
    }
}


module.exports.isreviewAuthor = async(req, res, next)=>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash("error" , "You are not the author of this review");
        return  res.redirect(`/listings/${id}`);
    }
    next();
}


