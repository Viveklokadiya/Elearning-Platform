import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { HiUser, HiMail, HiShieldCheck, HiAcademicCap } from "react-icons/hi";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white section-padding">
        <div className="container-max">
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiUser className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-purple-100 text-lg">Manage your learning journey and profile</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HiUser className="w-6 h-6 mr-3 text-purple-600" />
                  Profile Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <HiUser className="w-5 h-5 text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <HiMail className="w-5 h-5 text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <HiShieldCheck className="w-5 h-5 text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <div className="flex items-center mt-1">
                        <p className="text-lg font-semibold text-gray-900 capitalize mr-3">{user.role}</p>
                        {user.role === "admin" && (
                          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            Administrator
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              {/* Dashboard Card */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate(`/${user._id}/dashboard`)}
                    className="w-full btn-primary flex items-center justify-center space-x-3"
                  >
                    <MdDashboard className="w-5 h-5" />
                    <span>My Dashboard</span>
                  </button>

                  {user.role === "admin" && (
                    <button
                      onClick={() => navigate(`/admin/dashboard`)}
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <HiShieldCheck className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </button>
                  )}

                  <button
                    onClick={() => navigate('/courses')}
                    className="w-full btn-secondary flex items-center justify-center space-x-3"
                  >
                    <HiAcademicCap className="w-5 h-5" />
                    <span>Browse Courses</span>
                  </button>
                </div>
              </div>

              {/* Account Stats */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Enrolled Courses</span>
                      <span className="text-lg font-bold text-purple-600">
                        {user.subscription ? user.subscription.length : 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((user.subscription?.length || 0) * 20, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <div className="card p-6">
                <button
                  onClick={logoutHandler}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <IoMdLogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
