// two libraries to upload image to cloudinary
require('dotenv').config();

const cloudinary = require('cloudinary').v2;

console.log(cloudinary.config().cloud_name);

// upload can be specified as a local path, a remote HTTP or HTTPS URL, a whitelisted storage bucket (S3 or Google Storage) URL, a data stream, a base64 data URI, or an FTP URL.
cloudinary.v2.uploader
.upload("/home/my_image.jpg")
.then(result=>console.log(result));
