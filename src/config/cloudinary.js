import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const cloudinaryUploader = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

       console.log("Response : " , response.secure_url);
       
    // Delete file from local storage
    fs.unlinkSync(localFilePath);

    return response.secure_url;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
};


/*
⚡ Most Useful Fields You’ll Use

secure_url → final HTTPS URL (DB me save karna isi ko best hai ✅).

public_id → unique ID jo Cloudinary deta hai (future me delete/update karne ke liye use hota hai).

resource_type → "image" / "video" / "raw".

format → file type (jpg, png, mp4, etc.).

bytes → file size in bytes.

width & height → image/video dimensions.

duration (agar video hai) → length in seconds.
*/