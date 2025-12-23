const { model } = require("mongoose");
const Listing = require("../models/listing")

module.exports .index = async(req, res)=>{
     const allListings = await Listing.find({});
     res .render("listings/index.ejs",{allListings});
    };

module.exports.new = (req,res)=>{
    res.render("listings/new.ejs");
};



module.exports.create = async (req, res) => {
    try {

        // schema.validate(req.body);
        // let {title, description , image, price, country , location}= req.body;
        const newListing = new Listing(req.body.listing);

        console.log ( req.body.listing)

        newListing.owner = req.user._id;


        await newListing.save();
        console.log(newListing);

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    }catch(e){
         console.log("There is something wrong in create route",e)
    }
}



module.exports.show = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("review").populate("owner");    
    console.log(listing)
    res.render("listings/show.ejs",{listing});
}


module.exports .edit = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};


module.exports.update = async (req,res)=>{
    let {id} = req.params;

    // let listing = await Listing.findByIdAndUpdate(id);

    // if (!listing.owner.equals(curruser._id)){

    //     console.log("You dont have permission ")
    // }

    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}


module.exports.delete = async (req,res)=>{
    let {id} = req.params;
    let deleteListing =await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings")
}