const List = require('../models/listing')
const listingSchema = require('../utils/listingSchema')
const cloudinary = require('../config/cloudinary')

module.exports = async (req,res)=>{
    if(!req.isAuthenticated()){
        req.flash('returnURL', req.originalUrl);
        req.flash('error', 'You need to be logged in first');
        return res.redirect('/signin');
    }
    let {id}=req.params;
    let listing = await List.findById(id).populate('owner');
    if(listing.owner._id.toString() !== req.user._id.toString()) return res.redirect(`/listings/${id}`);
    let { error } = listingSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let updatedListing = req.body.listing;
    if(req.file) {
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        );
        updatedListing.image = {
            url: result.secure_url,
            filename: result.public_id
        }
    }
    await List.findByIdAndUpdate(id,{...updatedListing});
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
}