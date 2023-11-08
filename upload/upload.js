// two libraries to upload image to cloudinary
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Return "https" URLs by setting secure: true      
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
    secure: true
});

console.log(cloudinary.config());
// // Log the configuration
// console.log(cloudinary.config());
// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

function uploadImage() {
    // Upload image to cloudinary
    cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
        function (error, result) {
            console.log(result, error);
        });
}

document.querySelector('#upload').addEventListner('click', uploadImage);