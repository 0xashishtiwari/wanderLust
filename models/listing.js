const mongoose = require('mongoose');
const { Review } = require('./review');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : [true , "Title is required"]
    },
    description : {
        type : String
    },
    image : {
       url : String,
       filename : String
    },
    price : {
        type : Number
    },
    location : {
        type :String
    },
    country : {
        type : String
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
});

listingSchema.post('findOneAndDelete' , async(listing)=>{   /////post mongoose middleware
    if(listing.reviews.length){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing" , listingSchema);

module.exports  = Listing;