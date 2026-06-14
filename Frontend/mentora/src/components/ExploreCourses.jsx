import React from "react";
import { motion as Motion } from "framer-motion";
import { FaCode, FaPaintBrush, FaMobileAlt, FaRobot, FaDatabase, FaLock } from "react-icons/fa";

function ExploreCourses() {
  const courses = [
    { icon: <FaCode />, title: "Web Development", desc: "Master front-end & back-end web technologies." },
    { icon: <FaPaintBrush />, title: "UI/UX Design", desc: "Design beautiful, user-centered digital experiences." },
    { icon: <FaMobileAlt />, title: "App Development", desc: "Build fast, modern cross-platform mobile apps." },
    { icon: <FaRobot />, title: "AI & Machine Learning", desc: "Understand AI principles and train ML models." },
    { icon: <FaDatabase />, title: "Data Science", desc: "Learn data analysis, visualization, and Python tools." },
    { icon: <FaCode />, title: "DSA Mastery", desc: "Master data structures and algorithms with hands-on problem solving."
    },

  ];

  return (
    <div className="w-full flex flex-col items-center">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {courses.map((course, i) => (
          <Motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}

            whileHover={{ scale: 1.06, rotate: 0 }}

            className="p-7 bg-white rounded-2xl border border-gray-100 
                       shadow-md hover:shadow-2xl transition-all 
                       cursor-pointer group"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full 
                            bg-gradient-to-br from-indigo-500 to-purple-500 
                            text-white flex items-center justify-center 
                            text-4xl shadow-lg group-hover:scale-110 
                            transition-transform">
              {course.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              {course.title}
            </h3>

            <p className="text-gray-600 text-sm text-center">
              {course.desc}
            </p>
          </Motion.div>
        ))}
      </div>
    </div>
  );
}

export default ExploreCourses;
