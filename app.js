require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const { render } = require("ejs");
const methodOverride = require('method-override')
const ejsMate = require("ejs-mate")
// const {schema}= require("./schema")
const Review = require("./models/review.js");
// const review = require("./models/review.js");
// const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash")
const passport = require("passport");
const localStrategy = require("passport-local");
const user = require("./models/user.js")

const listingsrouter = require("./Routes/listing.js")
const reviewsrouter = require("./Routes/review.js");
const { register } = require("module");
const Userrouter = require("./Routes/user.js");

// Database url
const dburl= process.env.mongo_url;


const store = MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.secret
    },
    touchAfter: 24*3600,
  });

// store.on("error",()=>{
//     console.log("error in mongo-session",err)
// })
const sessionOptions = {
    store,
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie :{
        expires: Date.now() +7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true
    }
}
app.use(session (sessionOptions))
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    await mongoose.connect(dburl);
}
main().then(()=>{
    console.log('connnected to database.')
}).catch((err)=>{
    console.log('There was an error : ',err)
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use (methodOverride("_method"))
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")))
// app.use(cookieParser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res. locals.curruser = req.user;
    next();
})

// app.get("/demo",async(req,res)=>{
//     let fakeuser = new user({
//         email:"student@gmail.com",
//         username:"alden"
//     })
//     let registeruser = await  user.register(fakeuser, "helloworld");

//     console.log(registeruser);
// })



app.use("/listings",listingsrouter)
app.use("/listings/:id/review",reviewsrouter);
app.use("/",Userrouter)

//home route
app .get('/',(req,res)=>{
    res.send ('Hi is this alden pimenta, and you server is working....');
});




  
// app .get('/testlisting',async (req,res)=>{
//     let sampleListing  = new Listing({
//         title:'My new villa',
//         description: "This is new villa that won't disappoint you.",
//         price: 10000,
//         location: 'Goa',
//         country:'India'
//     })
//     await sampleListing.save();
//     console.log("Sampled was saved.");
//     res.send("Successful");
// })

app.use ((err,req, res, next)=>{
    // res.send("Something went wrong");
    res.render("error.ejs")
})

app. listen(8080, ()=>{
    console.log('app is listening');
})

