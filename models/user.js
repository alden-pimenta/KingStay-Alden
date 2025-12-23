const { required } = require("joi");
const mongoose = require("mongoose");
// const { default: passportLocalMongoose } = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
// const { required } = require("joi");

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);


