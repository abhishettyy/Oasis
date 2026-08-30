const User = require('../models/User')
module.exports = async (id, done) => {
    try {
        const user = await User.findById(id).select('+hash');
        done(null, user);
    } catch(err) {
        done(err);
    }
}