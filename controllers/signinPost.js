const joi = require('../utils/signinSchema')
module.exports = (req, res)=>{
        let {error} = joi.validate(req.body)
        if(error) return res.status(402).send('Forbidden')
        let returnTo = req.flash('returnURL')[0];
        req.flash("success" , "Logged in successfully")
        res.redirect(returnTo || '/listings')
}