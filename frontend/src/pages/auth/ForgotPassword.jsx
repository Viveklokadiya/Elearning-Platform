import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import { HiMail, HiArrowLeft, HiKey } from "react-icons/hi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot`, { email });
      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-repeat opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/login"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Back to Sign In
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HiKey className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your email address and we'll send you a reset link</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We'll send password reset instructions to this email
              </p>
            </div>

            {/* Submit Button */}
            <button
              disabled={btnLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {btnLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <HiMail className="w-5 h-5 mr-2" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-8">
            <div className="text-center text-gray-600">
              Remember your password?{" "}
              <Link 
                to="/login" 
                className="text-orange-600 hover:text-orange-800 font-semibold transition-colors duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
