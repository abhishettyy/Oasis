const User = require('../models/User')
module.exports = async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if(!user) {
            user = new User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value
            });
            await user.save();
        } else {
            user.googleId = profile.id;
            await user.save();
        }
        return done(null, user);
    } catch(err) {
        return done(err);
    }
}
