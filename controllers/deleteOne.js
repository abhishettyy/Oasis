const List = require('../models/listing');
module.exports = async (req,res)=>{
    let {id} = req.params;
    if(!req.isAuthenticated()) {
        req.flash('returnURL',req.originalUrl);
        return res.redirect('/signin');
    }
    let post = await List.findById(id).populate('owner');
    if(req.user._id.toString() != post.owner._id.toString()) return res.status(403).send('Forbidden');
    await List.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect("/listings");
}