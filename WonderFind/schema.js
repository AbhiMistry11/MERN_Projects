const joi = require("joi");

module.exports.listingSchema = joi.object({
  listing: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().min(0).required(),
    location: joi.string().required(),
    country: joi.string().required(),
    image: joi.object({
      filename: joi.string().allow(""),
      url: joi.string().uri().default("https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")
    }).default()
  }).required()
});

module.exports.reviewSchema = joi.object({
  review:joi.object({
rating:joi.number().required(),
comment:joi.string().required()
  })
}).required()