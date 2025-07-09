import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { HiCheckCircle, HiSparkles, HiAcademicCap, HiArrowRight } from "react-icons/hi";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Add a small delay to show the success animation
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-repeat opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="w-full max-w-2xl relative">
        {/* Success Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon with Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <HiCheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce">
              <HiSparkles className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce delay-300">
              <HiSparkles className="w-6 h-6 text-green-500" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Congratulations! Your course subscription has been activated.
          </p>
          
          <p className="text-gray-500 mb-8">
            You now have full access to all course materials and lectures.
          </p>

          {/* Reference Number */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction Details</h3>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600">Reference No:</span>
              <span className="font-mono font-bold text-purple-600 text-lg">{params.id}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to={`/${user._id}/dashboard`}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <HiAcademicCap className="w-6 h-6" />
              <span>Go to Dashboard</span>
              <HiArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/courses"
              className="w-full sm:w-auto bg-white text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Browse More Courses
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-float">
          <div className="w-4 h-4 bg-green-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-20 animate-float delay-1000">
          <div className="w-6 h-6 bg-emerald-400 rounded-full opacity-40"></div>
        </div>
        <div className="absolute top-1/3 right-10 animate-float delay-500">
          <div className="w-3 h-3 bg-teal-400 rounded-full opacity-50"></div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg">
            Welcome to your learning journey! 🚀
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Start exploring your courses and unlock your potential
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
