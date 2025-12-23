const express = require("express");
const router= express.Router();
const Listing = require("../models/listing.js");
const {isloggedin} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

// Index route
router.get("/",listingController.index);


// New route 
router .get("/new",isloggedin,listingController.new)

// Create Route
router.post("/", isloggedin,listingController.create);


//show route
router .get("/:id", listingController.show)

// Edit route
router .get("/:id/edit",isloggedin, listingController.edit)

// Update route 
router.put("/:id",isloggedin, listingController.update)

//delete route
router.delete("/:id",isloggedin, listingController.delete)


module.exports= router;