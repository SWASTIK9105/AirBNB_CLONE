
const Joi = require('joi');
module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
       description:Joi.string().required(),
       image: { filename:Joi.string().required(),
        url:Joi.string().required()    },
       price:Joi.number().required().min(0),
       location:Joi.string().required(),
       country:Joi.string().required(),
       coordinates:[Joi.number().required(),Joi.number().required()],
       category: Joi.array()
    .items(Joi.string().valid('rooms', 'iconic cities', 'castles', 'amazing pools', 'mountains', 'arctic', 'farms', 'camping','trending')),
 } ).required()
});
module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(0).max(5),
        comment:Joi.string().required()
    }).required()
})