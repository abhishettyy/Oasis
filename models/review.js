const mongoose = require('mongoose');
let reviewSchema = mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    description : String,
    rating :{
        type : Number,
        min : 1,
        max : 5,
        default : 3
    }
})

const review = mongoose.model('review' , reviewSchema);
module.exports = review;