import * as dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileAndGetURL = async (sourceFilePath) => {
  try {
    const upload = await cloudinary.v2.uploader.upload(sourceFilePath, {
      folder: "recipe-pad",
    });
    // TODO: delete local image at "/uploads"
    return upload.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Error uploading file to Cloudinary");
  }
};
