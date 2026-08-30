const { required } = require('joi');
const mongoose = require('mongoose');
const passport = require('passport-local-mongoose').default;
let userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    googleId: String
})
userSchema.plugin(passport)

const User = mongoose.model('User' , userSchema)

module.exports = User;