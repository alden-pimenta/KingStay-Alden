const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewR = require("../controllers/reviews.js");



//review route

router.post ("/", reviewR.createRoute)

// Delete review route
// router.delete("/listings/:id/reviews/:reviewId",async(req,res)=>{
//     let {id, reviewId} =req. params;

//     await Listing .findByIdAndUpdate(id , { $pull :{reviews:reviewId}})
//     await Review .findById(reviewId);

//     res.redirect(`listings/${id}`)
// })



module.exports= router;