const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment : String,
    rating : {
        type : Number,
        min : 1,
        max : 5,

    },
    creadtedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports.Review = mongoose.model("Review" , reviewSchema);