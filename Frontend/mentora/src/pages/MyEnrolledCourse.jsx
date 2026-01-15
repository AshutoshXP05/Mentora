// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function MyEnrolledCourse() {
//     const {userData} = useSelector((state) => state.user);
//     const navigatge = useNavigate();
//   return (
//     <div>MyEnrolledCourse</div>
//   )
// }

// export default MyEnrolledCourse

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";
import EmptyImgae from "../assets/EmptyImage.jpg"

const MyEnrolledCourse = () => {
  const { userData } = useSelector((state) => state.user);
  const { courseData } = useSelector((state) => state.course);
  const navigate = useNavigate();

  // Get enrolled course objects from IDs
  const enrolledCourses =
    courseData?.data?.filter((course) =>
      userData?.enrolledCourses?.includes(course._id)
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-10 mt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🎓 My Enrolled Courses
        </h1>
        <p className="text-gray-500 mt-1">
          Continue learning from the courses you’ve enrolled in.
        </p>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userData?.enrolledCourses.length > 0 ? (
          userData?.enrolledCourses.map((course, index) => (
            <div
              key={index}
              onClick={() => navigate(`/viewlecture/${course._id}`)}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-44 overflow-hidden rounded-t-2xl">
                <img
                  src={course.thumbnail || EmptyImgae}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-3 text-white flex items-center gap-1 text-sm">
                  <FaPlayCircle className="text-green-400" />
                  <span>Continue</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {course.description || "No description available."}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {course.level }
                  </p>
                </div>

                {/* Meta Info */}
                <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MdOutlineCategory className="text-green-600" />
                    <span>{course.category || "Other"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiGraduationCap className="text-blue-500" />
                    <span>{course.level || "Beginner"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <img
              src="https://illustrations.popsy.co/gray/student-reading.svg"
              alt="No courses"
              className="mx-auto w-48 h-48 mb-6 opacity-80"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Enrolled Courses Yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start exploring and enroll in your first course to see it here!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-all"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrolledCourse;
