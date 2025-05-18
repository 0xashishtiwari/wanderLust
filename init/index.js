const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
    console.log('connected to db');
}
main();
const {data} = require('./data');
console.log(data.length);
const Listing  = require('../models/listing.js');


 const initdb =async () => {
    try {
        
        await Listing.deleteMany({});
        console.log('Data deleted successfully');
         await Listing.insertMany(data);
        console.log("Data inserted sucessfully");
    } catch (err) {
        console.log(err);
    }
    
  
}

initdb();