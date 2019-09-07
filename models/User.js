const mongoose = require("mongoose")
let userSchema = new mongoose.Schema({

    firstname: String,
    lastname:String,
    email:String,
    password: String,

})

let userModel = mongoose.model("user", userSchema)

module.exports = userModel;