const multer = require("multer");
const cloudinary = require("cloudinary");
const storageCloudinary = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  resource_type: "auto"
});

const storage = storageCloudinary({
  cloudinary,
  folder: "Sam-Alex-Eleni",
  allowedFormats: ["jpg", "png"]
  //resource_type: "raw"
});

const uploader = multer({
  storage
});

module.exports = uploader;
