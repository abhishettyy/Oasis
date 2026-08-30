const User = require('../models/User');

// GET /profile
module.exports.getProfile = (req, res) => {
    if(!req.isAuthenticated()) return res.redirect('/signin');
    res.render('profile', { user: req.user });
}

// POST /profile
module.exports.updateProfile = async (req, res) => {
    if(!req.isAuthenticated()) return res.redirect('/signin');
    const { action, username, email, oldPassword, newPassword } = req.body;

    if(action === 'updateInfo') {
        try {
            req.user.username = username;
            req.user.email = email;
            await req.user.save();
            req.flash('success', 'Profile updated successfully');
        } catch(err) {
            req.flash('error', 'Failed to update profile');
        }
    }

    if(action === 'changePassword') {
        try {
            await req.user.changePassword(oldPassword, newPassword);
            req.flash('success', 'Password changed successfully');
        } catch(err) {
            req.flash('error', 'Incorrect old password');
        }
    }

    res.redirect('/profile');
}
