import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "../../components/testimonials/Testimonials";
import { HiAcademicCap, HiLightBulb, HiSparkles } from "react-icons/hi";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 section-padding">        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container-max relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <HiAcademicCap className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to our
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                E-learning Platform
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              Unlock your potential with world-class courses. Learn, Grow, Excel in your journey to success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate("/courses")} 
                className="btn-primary text-lg px-12 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold"
              >
                Get Started Now
              </button>
              <button 
                onClick={() => navigate("/about")} 
                className="btn-secondary text-lg px-12 py-4 rounded-2xl border-white text-white hover:bg-white hover:text-purple-900"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <HiLightBulb className="w-8 h-8 text-yellow-400 opacity-70" />
        </div>
        <div className="absolute top-32 right-20 animate-pulse">
          <HiSparkles className="w-6 h-6 text-blue-400 opacity-70" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce delay-1000">
          <HiSparkles className="w-10 h-10 text-purple-400 opacity-50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">Our Platform?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience learning like never before with our cutting-edge features and expert-crafted content
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiAcademicCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry professionals with years of real-world experience
              </p>
            </div>
            
            <div className="card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightBulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Engage with hands-on projects and interactive exercises
              </p>
            </div>
            
            <div className="card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiSparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifetime Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Access your courses anytime, anywhere with lifetime membership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;
