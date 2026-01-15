import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaClock, FaBook } from "react-icons/fa";

function About() {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col justify-center">
      {/* === Top Section === */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-photo/portrait-smiling-man-holding-laptop_23-2149393669.jpg?t=st=1729820088~exp=1729823688~hmac=0f0b1af3c80d63e39cfc783cc9a6b07e0104f2ee928a7b6d3e2cc2c99a4aaf09&w=826"
            alt="Mentora Learning"
            className="rounded-3xl w-full max-w-md md:max-w-lg object-cover shadow-lg"
          />
        </div>

        {/* Right: Content */}
        <div>
          <h4 className="text-indigo-600 font-semibold text-sm tracking-wide uppercase mb-2">
            About Us
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            We Help You <span className="text-indigo-600">Maximize</span> Your Learning Growth
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Mentora is a next-generation learning management system built to empower 
            learners and educators. We provide engaging online courses, expert trainers, 
            and personalized progress tracking — all designed to simplify online education 
            and enhance student-instructor collaboration.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center gap-3">
              <FaBook className="text-indigo-600 text-xl" />
              <p className="font-medium">Simplified Learning</p>
            </div>
            <div className="flex items-center gap-3">
              <FaChalkboardTeacher className="text-indigo-600 text-xl" />
              <p className="font-medium">Expert Trainers</p>
            </div>
            <div className="flex items-center gap-3">
              <FaClock className="text-indigo-600 text-xl" />
              <p className="font-medium">Lifetime Access</p>
            </div>
            <div className="flex items-center gap-3">
              <FaUserGraduate className="text-indigo-600 text-xl" />
              <p className="font-medium">Career Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* === Bottom Section / Mission === */}
      <div className="bg-white py-14 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our mission is to make education accessible, engaging, and effective for everyone.
            We bridge the gap between learners and educators through technology, 
            ensuring that every student gets the attention and support they need 
            to thrive in their journey of growth.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
