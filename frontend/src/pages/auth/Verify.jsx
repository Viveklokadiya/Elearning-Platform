import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import { HiShieldCheck, HiAcademicCap, HiLockClosed } from "react-icons/hi";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
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
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HiShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
            <p className="text-gray-600">Enter the verification code sent to your email</p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* OTP Field */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="otp"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-300 text-center text-lg font-semibold tracking-widest"
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Check your email for the 6-digit verification code
              </p>
            </div>

            {/* ReCAPTCHA */}
            <div className="flex justify-center">
              <div className="transform scale-90 origin-center">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChange}
                  theme="light"
                />
              </div>
            </div>

            {/* Submit Button */}
            {show && (
              <button
                disabled={btnLoading}
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {btnLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <HiShieldCheck className="w-5 h-5 mr-2" />
                    Verify Account
                  </>
                )}
              </button>
            )}
          </form>

          {/* Links */}
          <div className="mt-8">
            <div className="text-center text-gray-600">
              Already verified?{" "}
              <Link 
                to="/login" 
                className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-300"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm">
            Didn't receive the code? Check your spam folder or contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
