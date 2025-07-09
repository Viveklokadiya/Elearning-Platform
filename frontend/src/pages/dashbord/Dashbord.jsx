      import React from "react";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { HiAcademicCap, HiBookOpen, HiTrendingUp, HiClock, HiStar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Dashbord = () => {
  const { mycourse } = CourseData();
  const { user } = UserData();
  const navigate = useNavigate();

  const enrolledCount = mycourse?.length || 0;
  const completionRate = 75; // This could be calculated from actual progress data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white section-padding">
        <div className="container-max">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-xl text-purple-100">
              Continue your learning journey and achieve your goals
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="section-padding">
        <div className="container-max">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 -mt-16 relative z-10">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HiBookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{enrolledCount}</h3>
              <p className="text-gray-600">Enrolled Courses</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{completionRate}%</h3>
              <p className="text-gray-600">Avg. Progress</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HiStar className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8</h3>
              <p className="text-gray-600">Avg. Rating</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Courses Section */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">My Courses</h2>
                <button
                  onClick={() => navigate('/courses')}
                  className="btn-secondary text-sm"
                >
                  Browse More Courses
                </button>
              </div>

              {mycourse && mycourse.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {mycourse.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="card p-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HiAcademicCap className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Courses Enrolled Yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Start your learning journey by enrolling in courses that match your interests and career goals.
                  </p>
                  <button
                    onClick={() => navigate('/courses')}
                    className="btn-primary"
                  >
                    Explore Courses
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/courses')}
                      className="w-full text-left p-3 rounded-xl hover:bg-purple-50 transition-colors duration-300 flex items-center space-x-3"
                    >
                      <HiBookOpen className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">Browse Courses</span>
                    </button>
                    <button
                      onClick={() => navigate('/account')}
                      className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors duration-300 flex items-center space-x-3"
                    >
                      <HiAcademicCap className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Profile Settings</span>
                    </button>
                  </div>
                </div>

                {/* Learning Goals */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Goals</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Weekly Goal</span>
                        <span className="text-sm font-semibold text-purple-600">3/5 hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Monthly Goal</span>
                        <span className="text-sm font-semibold text-blue-600">12/20 hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-3">
                      <HiClock className="w-4 h-4 text-gray-400" />
                      <span>Completed lecture 5 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <HiStar className="w-4 h-4 text-gray-400" />
                      <span>Earned certificate 2 days ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <HiBookOpen className="w-4 h-4 text-gray-400" />
                      <span>Started new course 1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
