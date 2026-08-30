const List = require('../models/listing')
const listingSchema = require('../utils/listingSchema')
const cloudinary = require("../config/cloudinary");
module.exports = async (req,res)=>{
    if(!req.isAuthenticated()) {
        req.flash('returnURL', req.originalUrl);
        req.flash('error', 'You need to be logged in first');
        return res.redirect('/signin');
    }
    let { error } = listingSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let listing = req.body.listing;
    if(req.file) {
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        );
        listing.image = {
            url: result.secure_url,
            filename: result.public_id
        }
    }
    let list = new List({...listing , owner : req.user._id});
    await list.save();
    req.flash('success', 'New listing added successfully!');
    res.redirect('/listings');
}