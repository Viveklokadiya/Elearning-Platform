import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import { HiPlay, HiClock, HiUser, HiBookOpen, HiArrowLeft } from "react-icons/hi";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  // Check if user has access to this course
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max px-6 py-4">
          <Link 
            to="/courses"
            className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300 mb-4"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Course Content */}
      <div className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Header */}
              <div className="card p-8">
                <div className="flex flex-col md:flex-row gap-8">                  <div className="flex-shrink-0">
                    <img 
                      src={course.image || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format`} 
                      alt={course.title}
                      className="w-full md:w-80 h-48 object-cover rounded-2xl shadow-lg"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format`;
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                        Enrolled Course
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {course.title}
                    </h1>
                    
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <HiUser className="w-5 h-5 mr-2 text-purple-500" />
                        <span>Instructor: <strong>{course.createdBy}</strong></span>
                      </div>
                      <div className="flex items-center">
                        <HiClock className="w-5 h-5 mr-2 text-blue-500" />
                        <span>Duration: <strong>{course.duration} weeks</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HiBookOpen className="w-6 h-6 mr-3 text-purple-600" />
                  About This Course
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {course.description}
                  </p>
                  <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">What you'll learn:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Master the fundamentals and advanced concepts
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Hands-on projects and real-world applications
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Industry best practices and professional techniques
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Certificate of completion upon finishing the course
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Start Learning Card */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Learn?</h3>
                  <p className="text-gray-600 mb-6">
                    Access all course lectures, materials, and resources.
                  </p>
                  
                  <Link 
                    to={`/lectures/${course._id}`}
                    className="w-full btn-primary flex items-center justify-center space-x-3 text-lg py-4"
                  >
                    <HiPlay className="w-6 h-6" />
                    <span>Start Learning</span>
                  </Link>
                </div>

                {/* Course Progress */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Course Progress</span>
                        <span className="text-sm font-semibold text-purple-600">0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lectures Completed</span>
                        <span className="font-semibold">0 / ?</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Features */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Course Features</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <HiPlay className="w-4 h-4 text-green-500 mr-3" />
                      Video Lectures
                    </li>
                    <li className="flex items-center">
                      <HiBookOpen className="w-4 h-4 text-blue-500 mr-3" />
                      Course Materials
                    </li>
                    <li className="flex items-center">
                      <HiClock className="w-4 h-4 text-purple-500 mr-3" />
                      Lifetime Access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStudy;
