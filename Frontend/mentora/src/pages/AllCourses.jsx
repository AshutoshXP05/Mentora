import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AllCoursesPage() {
  const { courseData } = useSelector((state) => state.course);
  const { reviewData } = useSelector((state) => state.review);

  // courseData can be either array directly or wrapped in data property
  const courses = Array.isArray(courseData) ? courseData : courseData?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  


  const categories = [
    "AI Basics",
    "Web Dev",
    "UI/UX Design",
    "Data Science",
    "DSA Mastery",
    "Other",
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const getAverageRating = (courseId) => {
    const courseReviews = reviewData.filter(
      (r) => r.course?._id === courseId || r.course === courseId
    );
    if (!courseReviews.length) return 0;

    const total = courseReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / courseReviews.length).toFixed(1);
  };

  const filteredCourses = courses.filter((course) => {
    const matchSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 mt-10">

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Explore <span className="text-indigo-600">All Courses</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Find your next perfect learning path.
            </p>
          </div>

          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none 
              shadow-sm placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* SIDEBAR FOR CATEGORIES */}
          <aside className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
              Categories
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                  Clear
                </button>
              )}
            </h2>

            <ul className="flex flex-col gap-3">
              {categories.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                return (
                  <li
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`cursor-pointer px-4 py-2.5 rounded-lg flex items-center justify-between 
                    font-medium transition-all duration-200 border
                    ${
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.03]"
                        : "bg-gray-50 hover:bg-indigo-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <span className="text-xs font-semibold bg-white text-indigo-600 px-2 py-0.5 rounded-md shadow">
                        ✓
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* COURSES GRID */}
          <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">

            {courses.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center mt-10 text-lg">
                Loading courses... If this persists, no published courses are available yet.
              </p>
            ) : filteredCourses.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center mt-10 text-lg">
                No courses found matching your filters.
              </p>
            ) : (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => navigate(`/viewcourse/${course._id}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 
                  hover:shadow-xl hover:border-indigo-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/thumbnails/default.png"}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      {course.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {course.subTitle || "No description available"}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{course.price}
                      </span>

                      <span className="text-sm bg-yellow-300 px-2 py-1 rounded-full font-medium shadow">
                        ⭐ {getAverageRating(course._id)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
