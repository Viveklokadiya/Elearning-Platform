import React from "react";
import { HiStar } from "react-icons/hi";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Software Developer",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch. I was able to transition into my dream career!",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Data Scientist",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable. Highly recommend to anyone looking to upskill!",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1d9?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "UX Designer",
      message:
        "The quality of content and presentation is outstanding. I was able to learn complex concepts easily thanks to the well-structured curriculum.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      position: "Product Manager",
      message:
        "The flexibility of learning at my own pace while having access to expert instructors made all the difference in my learning journey.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-gradient">Students Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our successful students have to say about their learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="card-gradient p-8 relative overflow-hidden group">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 text-6xl text-purple-200 font-serif opacity-30">
                "
              </div>
              
              {/* Rating Stars */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                {testimonial.message}
              </p>

              {/* Student Info */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=8a4baf&color=fff&size=150`;
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-purple-600 font-medium">{testimonial.position}</p>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card p-12 max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h3>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of successful students who have transformed their careers with our courses.
            </p>
            <button className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Start Learning Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
