import React from "react";
import { HiAcademicCap } from "react-icons/hi";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <HiAcademicCap className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl animate-ping opacity-20 mx-auto"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gradient mb-4">E-Learning</h2>
        <p className="text-gray-600 mb-8">Loading your learning experience...</p>

        {/* Modern Loading Animation */}
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full mt-8 mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
