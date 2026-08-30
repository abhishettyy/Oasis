const express = require('express')
const router = express.Router({mergeParams : true});
const signup = require('../controllers/signup.js');
const signupPost = require('../controllers/signupPost.js')
const authenticate = require('../controllers/authenticate.js')
const wrap = require('../utils/asyncWrap.js')
router.get('/',signup);
router.post('/',wrap(signupPost))
module.exports = router;
