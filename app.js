const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');

const ExpressError = require('./utils/ExpressError');




const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');

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



//-------------routes------------

app.use('/listings' , listings);

app.use('/listings/:id/reviews'  , reviews);

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
    res.status(statusCode).render('error.ejs' , {message , err});
    // res.status(statusCode).send(message);

});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening to port : ${PORT}`);
});
