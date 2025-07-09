import React, { useState } from "react";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";
import { HiClock, HiUser, HiCurrencyRupee, HiTrash, HiPlay, HiLockClosed } from "react-icons/hi";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setIsDeleting(true);
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const isSubscribed = user?.subscription?.includes(course._id);
  const isAdmin = user?.role === "admin";

  return (
    <div className="card group overflow-hidden">      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img 
          src={course.image || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format`} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          ₹{course.price}
        </div>

        {/* Subscription Status */}
        {isAuth && !isAdmin && (
          <div className="absolute top-4 left-4">
            {isSubscribed ? (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <HiPlay className="w-3 h-3" />
                <span>Enrolled</span>
              </div>
            ) : (
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <HiLockClosed className="w-3 h-3" />
                <span>Premium</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description || "Comprehensive course designed to help you master new skills and advance your career."}
        </p>

        {/* Course Meta Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600 text-sm">
            <HiUser className="w-4 h-4 mr-2 text-purple-500" />
            <span>Instructor: {course.createdBy}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <HiClock className="w-4 h-4 mr-2 text-blue-500" />
            <span>Duration: {course.duration} weeks</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <HiCurrencyRupee className="w-4 h-4 mr-2 text-green-500" />
            <span>Price: ₹{course.price}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {isAuth ? (
            <>
              {!isAdmin ? (
                <>
                  {isSubscribed ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <HiPlay className="w-4 h-4" />
                      <span>Continue Learning</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="w-full btn-primary"
                    >
                      Enroll Now
                    </button>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="w-full btn-primary"
                  >
                    View Course
                  </button>
                  <button
                    onClick={() => deleteHandler(course._id)}
                    disabled={isDeleting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiTrash className="w-4 h-4" />
                    <span>{isDeleting ? "Deleting..." : "Delete Course"}</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <button 
              onClick={() => navigate("/login")} 
              className="w-full btn-primary"
            >
              Login to Access
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
