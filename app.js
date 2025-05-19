const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing  = require('./models/listing');
const path = require('path');
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , '/views'));


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

app.get('/listings' , async (req , res)=>{
   const allListings = await Listing.find({});
   res.render('listings/index.ejs' , {allListings} );
  //  console.log(result);
});



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



app.listen(PORT, () => {
  console.log(`Server is listening to port : ${PORT}`);
});
