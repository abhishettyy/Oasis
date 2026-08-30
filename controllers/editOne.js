const List = require('../models/listing');
module.exports = async (req,res)=>{
    if(!req.isAuthenticated()){
        req.flash('returnURL', req.originalUrl);
        req.flash('error', 'You need to be logged in first');
        return res.redirect('/signin');
    }
    let {id}=req.params;
    let listing = await List.findById(id).populate('owner');
    if(listing.owner._id.toString() !== req.user._id.toString()) return res.redirect(`/listings/${id}`);
    res.render('listings/edit.ejs',{listing});
}