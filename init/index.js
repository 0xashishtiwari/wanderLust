const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
    console.log('connected to db');
}
main();
let {data} = require('./data');
console.log(data.length);
const Listing  = require('../models/listing.js');


 const initdb =async () => {
    try {
        
        await Listing.deleteMany({});
        console.log('Data deleted successfully');
      data =  data.map((obj)=>({...obj , owner : '683eb94df52ba02e9e341636'}))
         await Listing.insertMany(data);
        console.log("Data inserted sucessfully");
    } catch (err) {
        console.log(err);
    }
    
  
}

initdb();