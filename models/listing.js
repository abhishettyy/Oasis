const mongoose= require('mongoose');
const ListingSchema= new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description :{
        type:String
    },
    image :{
        filename :String,
        url:{
            default :"https://images.unsplash.com/photo-1633078654544-61b3455b9161?q=80&w=1045&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type:String
        }
    },
    price :{
        type : Number,
        required : true
    },
    location :{
        type : String,
        required: true
    },
    country :{
        type : String,
        required: true
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }
]

});
let List = mongoose.model('List',ListingSchema);
module.exports = List;