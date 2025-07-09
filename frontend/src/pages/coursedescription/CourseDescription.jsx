import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import { HiPlay, HiClock, HiUser, HiCurrencyRupee, HiStar, HiShoppingCart, HiCheckCircle, HiArrowLeft } from "react-icons/hi";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const { data: { order } } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        { headers: { token } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "E-Learning Platform",
        description: "Course Enrollment",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          
          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              { razorpay_order_id, razorpay_payment_id, razorpay_signature },
              { headers: { token } }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
          }
        },
        theme: { color: "#8a4baf" },
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  const isEnrolled = user && user.subscription.includes(course._id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max px-6 py-4">
          <Link 
            to="/courses"
            className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300"
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
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Header */}
              <div className="card p-8 mb-8">
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
                    {isEnrolled && (
                      <div className="mb-4">
                        <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                          ✓ Enrolled
                        </span>
                      </div>
                    )}
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {course.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <HiUser className="w-5 h-5 mr-2 text-purple-500" />
                        <span>Instructor: <strong>{course.createdBy}</strong></span>
                      </div>
                      <div className="flex items-center">
                        <HiClock className="w-5 h-5 mr-2 text-blue-500" />
                        <span>Duration: <strong>{course.duration} weeks</strong></span>
                      </div>
                      <div className="flex items-center">
                        <HiStar className="w-5 h-5 mr-2 text-yellow-500" />
                        <span>Rating: <strong>4.8/5</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-3xl font-bold text-purple-600">
                        <HiCurrencyRupee className="w-8 h-8" />
                        {course.price}
                      </div>
                      <span className="text-gray-500 line-through">₹{Math.floor(course.price * 1.5)}</span>
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        33% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div className="card p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Course</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {course.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="font-semibold text-purple-900 mb-3">What you'll learn</h3>
                      <ul className="space-y-2 text-purple-700">
                        <li className="flex items-start">
                          <HiCheckCircle className="w-5 h-5 mt-0.5 mr-2 text-purple-600" />
                          Master core concepts and fundamentals
                        </li>
                        <li className="flex items-start">
                          <HiCheckCircle className="w-5 h-5 mt-0.5 mr-2 text-purple-600" />
                          Build real-world projects
                        </li>
                        <li className="flex items-start">
                          <HiCheckCircle className="w-5 h-5 mt-0.5 mr-2 text-purple-600" />
                          Industry best practices
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="font-semibold text-blue-900 mb-3">Course Features</h3>
                      <ul className="space-y-2 text-blue-700">
                        <li className="flex items-start">
                          <HiCheckCircle className="w-5 h-5 mt-0.5 mr-2 text-blue-600" />
                          HD video lectures
                        </li>
                        <li className="flex items-start">
                          <HiCheckCircle className="w-5 h-5 mt-0.5 mr-2 text-blue-600" />
                          Lifetime access
                        </li>
                        <li className="flex items-start">
                          <HiCheckCircle className="w-5 h-5 mt-0.5 mr-2 text-blue-600" />
                          Certificate of completion
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="card p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      ₹{course.price}
                    </div>
                    <p className="text-gray-600">One-time payment, lifetime access</p>
                  </div>

                  {isEnrolled ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="w-full btn-primary flex items-center justify-center space-x-3 text-lg py-4"
                    >
                      <HiPlay className="w-6 h-6" />
                      <span>Continue Learning</span>
                    </button>
                  ) : (
                    <button
                      onClick={checkoutHandler}
                      disabled={loading}
                      className="w-full btn-primary flex items-center justify-center space-x-3 text-lg py-4 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <HiShoppingCart className="w-6 h-6" />
                          <span>Enroll Now</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Course Stats */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Course Stats</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students</span>
                        <span className="font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language</span>
                        <span className="font-semibold">English</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated</span>
                        <span className="font-semibold">Dec 2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Money Back Guarantee */}
                  <div className="mt-6 p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <HiCheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">30-Day Money Back</p>
                        <p className="text-sm text-green-700">100% satisfaction guaranteed</p>
                      </div>
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

export default CourseDescription;
