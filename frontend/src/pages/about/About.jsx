import React from "react";
import { HiAcademicCap, HiUsers, HiLightBulb, HiStar, HiTrendingUp, HiShieldCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: HiUsers, number: "50K+", label: "Students Enrolled" },
    { icon: HiAcademicCap, number: "500+", label: "Courses Available" },
    { icon: HiStar, number: "4.9/5", label: "Average Rating" },
    { icon: HiTrendingUp, number: "95%", label: "Success Rate" }
  ];

  const features = [
    {
      icon: HiAcademicCap,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience and proven track records."
    },
    {
      icon: HiLightBulb,
      title: "Interactive Learning",
      description: "Engage with hands-on projects, quizzes, and interactive content designed for better retention."
    },
    {
      icon: HiShieldCheck,
      title: "Certified Courses",
      description: "Earn recognized certificates upon completion to boost your professional credentials."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white section-padding">
        <div className="container-max text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <HiAcademicCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-yellow-300">E-Learning</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
            Empowering learners worldwide with cutting-edge courses, expert instruction, 
            and innovative learning experiences that transform careers and lives.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We are dedicated to providing high-quality online courses that help individuals 
                learn and grow in their desired fields. Our experienced instructors ensure that 
                each course is tailored for effective learning and practical application.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Whether you're looking to advance your career, switch fields, or simply learn 
                something new, we provide the tools, resources, and support you need to succeed 
                in today's competitive landscape.
              </p>
              <button 
                onClick={() => navigate('/courses')}
                className="btn-primary"
              >
                Explore Courses
              </button>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <HiAcademicCap className="w-24 h-24 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Quality Education</h3>
                  <p className="text-gray-600 mt-2">For Everyone, Everywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-purple-100">
              Trusted by thousands of learners worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">Our Platform?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best learning experience with features 
              designed to help you succeed.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HiLightBulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">Continuously improving our platform with the latest technology and teaching methods.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HiShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">Maintaining the highest standards in course content and user experience.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HiUsers className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">Building a supportive learning community where everyone can thrive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community of learners and take the next step in your educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/courses')}
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Browse Courses
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
