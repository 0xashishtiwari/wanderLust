const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing  = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/WrapAsync')
const ExpressError = require('./utils/ExpressError');

app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , '/views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

main();



app.get("/", (req, res) => {
  res.send("Root is working");
});


//--------------INDEX ROUTE------------------


app.get('/listings' , wrapAsync(async (req , res)=>{
   const allListings = await Listing.find({});
   res.render('listings/index.ejs' , {allListings} );
  //  console.log(result);
}));

//---------------New Listings Route------------

app.get('/listings/new' , (req ,res)=>{
  res.render('listings/new.ejs');
});



//--------------SHOW ROUTE---------------------

app.get('/listings/:id' , wrapAsync(async (req ,res)=>{
  let {id} = req.params;
  const listing  =  await Listing.findById(id);
  res.render('listings/show.ejs' , {listing});
}));


//----------Create ROUTE------------------------

app.post('/listings' , wrapAsync(async(req ,res ,next)=>{
    if(!req.body.listing){
      throw new ExpressError(400 ,"Sent valid data for listing"); // 400 is bad request
    }
   const newListing = new Listing(req.body.listing); 
   await newListing.save();
   res.redirect('/listings');
}));


//-------------Edit ROUTE-------------------------

app.get('/listings/:id/edit' , wrapAsync(async(req , res)=>{

    let {id} = req.params;
    let listing = await Listing.findById(`${id}`);
    res.render('listings/edit.ejs' , {listing});
    
}));

//--------------UPDATE ROUTE----------------------
app.put('/listings/:id' , wrapAsync(async(req , res)=>{
    if(!req.body.listing){
      throw new ExpressError(400 ,"Sent valid data for listing"); // 400 is bad request
    }
     let {id} = req.params;
    await Listing.findByIdAndUpdate(id , req.body.listing);
    res.redirect(`/listings/${id}`);
}));



//-------------DELETE ROUTE-----------------------

app.delete('/listings/:id' , wrapAsync(async(req , res)=>{
   let {id} = req.params;
  let deletedListing =  await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
   res.redirect('/listings');
}));




// app.get('/testListing' , async (req, res)=>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Calungute Goa",
//         country : "India"
//     });
//     await sampleListing.save();
    
//     res.send("Sucessfully saved database & Testing");
// })



app.all(/.*/ , (req , res ,next)=>{
  next(new ExpressError(404 , "Page not found"));
});


//-----------------ERROR HANDLER-------------------

app.use((err , req, res, next)=>{
    let {statusCode=500 , message="Something went wrong"} = err;
    res.status(statusCode).send(message);

});

app.listen(PORT, () => {
  console.log(`Server is listening to port : ${PORT}`);
});
