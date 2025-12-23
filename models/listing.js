const mongoose = require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   default: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  //   set:(v) =>
  //     v == ' ' ? "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  //       : v,
  // },
  image: {
        url: String,
        filename: String,
    },
  price: Number,
  location: String,
  country: String,
  review: [
    {
      type: Schema.Types.ObjectId ,
      ref:"Review"
    }
  ]
  ,owner: {
    type: Schema.Types.ObjectId,
    ref :"user"
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;