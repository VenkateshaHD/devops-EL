import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

// Mock Cloudinary for local development if credentials are missing
if (!ENV.CLOUDINARY_CLOUD_NAME || ENV.CLOUDINARY_CLOUD_NAME === "dummy") {
  console.log("Using Mock Cloudinary Implementation");
  cloudinary.uploader.upload = async (file) => {
    console.log("Mocking Cloudinary Upload");
    return {
      secure_url: file, // Echo back the base64 image
      public_id: "mock_id_" + Date.now(),
    };
  };
  cloudinary.uploader.destroy = async (public_id) => {
    console.log("Mocking Cloudinary Destroy:", public_id);
    return { result: "ok" };
  };
}

export default cloudinary;
