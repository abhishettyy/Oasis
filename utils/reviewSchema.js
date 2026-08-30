const joi = require('joi');
module.exports = joi.object({
    review: joi.object({
        rating:      joi.number().min(1).max(5).required(),
        description: joi.string().required()
    }).required()
});
