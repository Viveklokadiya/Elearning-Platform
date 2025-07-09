// Utility functions for file handling in frontend

// Check if file is an image
export const isImageFile = (file) => {
  return file && file.type.startsWith('image/');
};

// Check if file is a video
export const isVideoFile = (file) => {
  return file && file.type.startsWith('video/');
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate file type and size
export const validateFile = (file, type = 'image', maxSize = 100) => {
  const errors = [];
  
  if (!file) {
    errors.push('Please select a file');
    return errors;
  }
  
  // Check file type
  if (type === 'image' && !isImageFile(file)) {
    errors.push('Please select a valid image file (PNG, JPG, GIF, WebP)');
  }
  
  if (type === 'video' && !isVideoFile(file)) {
    errors.push('Please select a valid video file (MP4, AVI, MOV, WMV)');
  }
  
  // Check file size (maxSize in MB)
  const maxSizeBytes = maxSize * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    errors.push(`File size should be less than ${maxSize}MB. Current size: ${formatFileSize(file.size)}`);
  }
  
  return errors;
};

// Create preview URL for files
export const createPreviewUrl = (file) => {
  if (!file) return null;
  return URL.createObjectURL(file);
};

// Clean up preview URL
export const cleanupPreviewUrl = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};
