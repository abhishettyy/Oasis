const express = require('express')
const router = express.Router({mergeParams : true});
const signin = require('../controllers/signin.js');
const signinPost = require('../controllers/signinPost.js')
const authenticate = require('../controllers/authenticate.js')
router.get('/',signin);
router.post('/',authenticate,signinPost)
module.exports = router;
