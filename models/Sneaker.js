const mongoose = require("mongoose")
let sneakerSchema = new mongoose.Schema({

    sneaker_name: String,
    sneaker_ref: String,
    sneaker_size:Number,
    sneaker_descr: String,
    sneaker_price: Number,
    sneaker_category: String, // men, women, kids
    sneaker_image:String,
    sneaker_tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag"
    }
})

let sneakerModel = mongoose.model("Sneaker", sneakerSchema)

module.exports = sneakerModel;