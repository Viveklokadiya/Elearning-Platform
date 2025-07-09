import React, { useState } from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { HiSearch, HiFilter } from "react-icons/hi";

const Courses = () => {
  const { courses } = CourseData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories from courses
  const categories = courses ? ["all", ...new Set(courses.map(course => course.category))] : ["all"];

  // Filter courses based on search and category
  const filteredCourses = courses ? courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Explore Our <span className="text-yellow-300">Courses</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
            Discover world-class courses designed by industry experts to advance your career
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="bg-white rounded-2xl shadow-xl p-8 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 text-gray-700"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <HiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 text-gray-700 bg-white cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-6 text-gray-600">
              <p>
                Showing {filteredCourses.length} of {courses?.length || 0} courses
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-20">
        <div className="container-max px-6">
          {filteredCourses && filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <HiSearch className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Courses Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {courses?.length === 0 
                  ? "No courses are available yet. Check back soon!" 
                  : "Try adjusting your search criteria or browse all courses."
                }
              </p>
              {searchTerm || selectedCategory !== "all" ? (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
