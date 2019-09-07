const mongoose = require("mongoose")
let tagSchema = new mongoose.Schema({

    tag: String

})

let tagModel = mongoose.model("tag", tagSchema)

module.exports = tagModel;