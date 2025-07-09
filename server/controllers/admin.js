import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/User.js";
import { uploadBufferToCloudinary, deleteFromCloudinary, extractPublicId } from "../middlewares/cloudinaryUpload.js";

export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;

  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).json({
      message: "Course image is required",
    });
  }

  // Upload image to Cloudinary
  const uploadOptions = {
    folder: 'elearning/courses',
    resource_type: 'image',
    transformation: [
      { width: 800, height: 600, crop: 'limit' },
      { quality: 'auto' },
      { fetch_format: 'auto' }
    ]
  };

  const cloudinaryResult = await uploadBufferToCloudinary(imageFile.buffer, uploadOptions);

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    image: cloudinaryResult.secure_url,
    duration,
    price,
  });

  res.status(201).json({
    message: "Course Created Successfully",
  });
});

export const addLectures = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course)
    return res.status(404).json({
      message: "No Course with this id",
    });

  const { title, description } = req.body;

  const videoFile = req.file;

  if (!videoFile) {
    return res.status(400).json({
      message: "Lecture video is required",
    });
  }

  // Upload video to Cloudinary
  const uploadOptions = {
    folder: 'elearning/lectures',
    resource_type: 'video',
    transformation: [
      { quality: 'auto' },
      { fetch_format: 'auto' }
    ]
  };

  const cloudinaryResult = await uploadBufferToCloudinary(videoFile.buffer, uploadOptions);

  const lecture = await Lecture.create({
    title,
    description,
    video: cloudinaryResult.secure_url,
    course: course._id,
  });

  res.status(201).json({
    message: "Lecture Added",
    lecture,
  });
});

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture) {
    return res.status(404).json({
      message: "Lecture not found",
    });
  }

  // Extract public ID from Cloudinary URL and delete from Cloudinary
  const publicId = extractPublicId(lecture.video);
  if (publicId) {
    try {
      await deleteFromCloudinary(`elearning/lectures/${publicId}`, 'video');
      console.log("Video deleted from Cloudinary");
    } catch (error) {
      console.error("Error deleting video from Cloudinary:", error);
    }
  }

  await lecture.deleteOne();

  res.json({ message: "Lecture Deleted" });
});

export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  const lectures = await Lecture.find({ course: course._id });

  // Delete all lecture videos from Cloudinary
  await Promise.all(
    lectures.map(async (lecture) => {
      const publicId = extractPublicId(lecture.video);
      if (publicId) {
        try {
          await deleteFromCloudinary(`elearning/lectures/${publicId}`, 'video');
          console.log("Lecture video deleted from Cloudinary");
        } catch (error) {
          console.error("Error deleting lecture video from Cloudinary:", error);
        }
      }
    })
  );

  // Delete course image from Cloudinary
  const courseImagePublicId = extractPublicId(course.image);
  if (courseImagePublicId) {
    try {
      await deleteFromCloudinary(`elearning/courses/${courseImagePublicId}`, 'image');
      console.log("Course image deleted from Cloudinary");
    } catch (error) {
      console.error("Error deleting course image from Cloudinary:", error);
    }
  }

  await Lecture.find({ course: req.params.id }).deleteMany();

  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course Deleted",
  });
});

export const getAllStats = TryCatch(async (req, res) => {
  const totalCoures = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCoures,
    totalLectures,
    totalUsers,
  };

  res.json({
    stats,
  });
});

export const getAllUser = TryCatch(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );

  res.json({ users });
});

export const updateRole = TryCatch(async (req, res) => {
  if (req.user.mainrole !== "superadmin")
    return res.status(403).json({
      message: "This endpoint is assign to superadmin",
    });
  const user = await User.findById(req.params.id);

  if (user.role === "user") {
    user.role = "admin";
    await user.save();

    return res.status(200).json({
      message: "Role updated to admin",
    });
  }

  if (user.role === "admin") {
    user.role = "user";
    await user.save();

    return res.status(200).json({
      message: "Role updated",
    });
  }
});
