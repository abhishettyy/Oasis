const express = require('express')
const router = express.Router({mergeParams : true})
const wrap = require('../utils/asyncWrap')
const List = require('../models/listing')
const showLists = require('../controllers/showlists')
const postList = require('../controllers/postlist')
const editList = require('../controllers/editList')
const newlist = require('../controllers/newlist')
const showList = require('../controllers/list')
const editOne = require('../controllers/editOne')
const deleteOne = require('../controllers/deleteOne')
const addreview = require('../controllers/addreview.js')
const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
});
const deleteReview = require('../controllers/deleteReview.js')

router.get('/',wrap(showLists))
router.post('/', upload.single('image'), wrap(postList))
router.put('/:id', upload.single('image'), wrap(editList))
router.get('/new', newlist)
router.get('/:id',wrap(showList))
router.post('/:id/reviews',wrap(addreview))
router.delete('/:id/reviews/:reviewId',wrap(deleteReview))
router.get('/:id/edit',wrap(editOne))
router.delete("/:id",wrap(deleteOne))

module.exports = router;