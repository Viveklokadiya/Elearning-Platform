import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { Readable } from 'stream';

// Configure multer to use memory storage
const storage = multer.memoryStorage();

export const uploadToCloudinary = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if the file is an image or video
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  }
}).single("file");

// Function to upload buffer to Cloudinary
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: 'auto',
      ...options
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Create a readable stream from buffer
    const bufferStream = Readable.from(buffer);
    bufferStream.pipe(uploadStream);
  });
};

// Function to delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Function to extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl) return null;
  
  // Extract public ID from Cloudinary URL
  const matches = cloudinaryUrl.match(/\/([^\/]+)\.(jpg|jpeg|png|gif|webp|mp4|avi|mov|wmv|flv)$/);
  if (matches) {
    return matches[1];
  }
  
  // Alternative pattern for Cloudinary URLs
  const urlParts = cloudinaryUrl.split('/');
  const fileWithExtension = urlParts[urlParts.length - 1];
  const publicId = fileWithExtension.split('.')[0];
  
  return publicId;
};
