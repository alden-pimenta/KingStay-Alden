const Listing = require("../models/listing")
const Review = require("../models/review")

module.exports.createRoute = async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review( req.body.review);

    listing.review.push (newReview);
    await newReview.save();
    await listing.save();

    console.log("New review saved");
    res. redirect(`/listings/${listing._id}`)
}