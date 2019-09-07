const cloudinary = require("cloudinary")
const multer = require("multer")
const cloudinaryStorage = require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = cloudinaryStorage({
    cloudinary,
    folder: "sneakers"
})

const fileUploader = multer({ storage });

module.exports = fileUploader;