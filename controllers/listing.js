const Listing = require('../models/listing');

module.exports.index = async (req , res)=>{
   const allListings = await Listing.find({});
   
   res.render('listings/index.ejs' , {allListings} );
  //  console.log(result);
}

module.exports.renderNewForm = (req ,res)=>{
    res.render('listings/new.ejs');
  
};

module.exports.showListing = async (req ,res)=>{
  let {id} = req.params;
  const listing  =  await Listing.findById(id).populate({path : 'reviews' , populate  : {path : 'author'}}).populate('owner');
  if(!listing){
    req.flash("error" , "Listing you requested for does not exist");
    res.redirect('/listings');
  
  }else{
    res.render('listings/show.ejs' , {listing});
  }

  
}

module.exports.createListing = async(req ,res ,next)=>{
   
    let url = req.file.path
    let filename = req.file.filename;
    // console.log(url , filename);

   const newListing = new Listing(req.body.listing); 
   newListing.image = {url , filename};

   let ownedby = req.user.id;
   newListing.owner = ownedby;
   await newListing.save();
   req.flash('success' , "New Listing created!")
   res.redirect('/listings');
}


module.exports.renderEditForm = async(req , res)=>{

    let {id} = req.params;
    let listing = await Listing.findById(`${id}`);
    if(!listing){
    req.flash("error" , "Listing you requested for does not exist");
    res.redirect('/listings');
  }else{

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace('/upload' , '/upload/h_300,w_300')
 
    res.render('listings/edit.ejs' , {listing , originalImageUrl});
  }
}


module.exports.updateListing = async(req , res)=>{
      let {id} = req.params;
      let listingData = {...req.body.listing};
      if(req.file){
        let url = req.file.path
       let filename = req.file.filename;
        listingData.image = {url , filename};
      }

    await Listing.findByIdAndUpdate(id , listingData);
     
      req.flash('success' ,'Listing Updated!')
      return res.redirect(`/listings/${id}`);
    
  
}

module.exports.deleteListing = async(req , res)=>{
   let {id} = req.params;
  let deletedListing =  await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash('success' ,'Listing Deleted!')
   res.redirect('/listings');
}