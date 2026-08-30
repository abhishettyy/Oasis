const User = require('../models/User')
const joi = require('../utils/signupSchema')
module.exports = async (req , res) =>{
    let {error} = joi.validate(req.body)
    if(error) return res.status(402).send('Forbidden')
    const {username , email , password} = req.body
    const user = new User({ username , email})
    let returnTo = req.flash('returnURL')[0];
    delete req.session.returnURL;
    try {
        await User.register(user , password)
    } catch(err) {
        if(err.name === 'UserExistsError') {
            req.flash('error', 'A user with that username already exists');
            return res.redirect('/signup');
        }
        throw err;
    }
    req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to Oasis!');
            res.redirect(returnTo || "/listings");
        });
}