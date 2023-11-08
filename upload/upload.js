// two libraries to upload image to cloudinary
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: trues
});

// Log the configuration
console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

// upload can be specified as a local path, a remote HTTP or HTTPS URL, a whitelisted storage bucket (S3 or Google Storage) URL, a data stream, a base64 data URI, or an FTP URL.
cloudinary.v2.uploader
.upload("/home/my_image.jpg")
.then(result=>console.log(result));
