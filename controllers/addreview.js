const reviewmodel = require('../models/review');
const List = require('../models/listing');
const reviewSchema = require('../utils/reviewSchema');

module.exports = async (req , res)=>{
    if(!req.isAuthenticated()) return res.status(403).send('Forbidden');
    let { error } = reviewSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let { id } = req.params;
    let { review } = req.body;
    let author1 = req.user._id;
    let r1 = new reviewmodel({author : author1, ...review})
    await r1.save()
    let list = await List.findById(id)
    list.reviews.push(r1._id)
    await list.save()
    res.redirect(`/listings/${id}`)
}