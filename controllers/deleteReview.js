const Review = require('../models/review');
const List = require('../models/listing');

module.exports = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(403).send('Forbidden');
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review) return res.status(404).send('Review not found');
    if(review.author.toString() !== req.user._id.toString()) return res.status(403).send('Forbidden');
    await Review.findByIdAndDelete(reviewId);
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    res.redirect(`/listings/${id}`);
}
