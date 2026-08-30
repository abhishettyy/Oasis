const List = require('../models/listing');
module.exports = async (req,res)=>{
    if(!req.isAuthenticated()){
        req.flash('returnURL', req.originalUrl);
        req.flash('error', 'You need to be logged in first');
         return res.redirect('/signin')
    }
    let {id}=req.params;
    let listing = await List.findById(id)
    .populate('owner')
    .populate({ path: 'reviews', populate: { path: 'author' } })
    let user = req.user._id;
    res.render('listings/list.ejs',{listing , user});
}