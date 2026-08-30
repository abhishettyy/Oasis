module.exports = (req,res)=>{
    if(!req.isAuthenticated()) {
        req.flash('returnURL', req.originalUrl);
        req.flash('error', 'You need to be logged in first');
        return res.redirect('/signin');
    }
    res.render('listings/new.ejs');
}