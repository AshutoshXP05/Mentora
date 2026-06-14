import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BookOpen, Users, Star, IndianRupee } from "lucide-react";
import EmptyImage from "../../assets/EmptyImage.jpg";
import { motion as Motion } from "framer-motion";

export default function EducatorDashboard() {
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const courses = Array.isArray(creatorCourseData?.data) ? creatorCourseData.data : [];

  const CourseProgressData = courses.map((course) => ({
    name: (course.title?.slice(0, 10) || "Untitled") + "...",
    lectures: course.lectures?.length || 0,
  }));

  const EnrollData = courses.map((course) => ({
    name: (course.title?.slice(0, 10) || "Untitled") + "...",
    enrolled: course.enrolledStudent?.length || 0,
  }));

  const totalStudents = courses.reduce((sum, c) => sum + (c.enrolledStudent?.length || 0), 0);

  const totalRevenue =
    courses.reduce((sum, c) => {
      return sum + (c.enrolledStudent?.length || 0) * (c.price || 0);
    }, 0) || 0;

  const stats = [
    {
      label: "Total Students",
      value: totalStudents.toString(),
      icon: <Users />,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Active Courses",
      value: courses.length.toString(),
      icon: <BookOpen />,
      color: "from-indigo-500 to-blue-600",
    },
    {
      label: "Average Rating",
      value: "4.7",
      icon: <Star />,
      color: "from-yellow-400 to-amber-500",
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <IndianRupee />,
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10 mt-4">
      
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center mb-10"
      >
        <div className="flex items-center gap-6">
          <Motion.img
            whileHover={{ scale: 1.05 }}
            src={userData?.photoUrl || EmptyImage}
            alt="profile"
            className="w-24 h-24 rounded-full border-[5px] border-indigo-100 object-cover shadow-md"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back, {userData?.name || "Educator"} 👋
            </h2>
            <p className="text-gray-500">{userData?.email}</p>
            <span className="text-sm mt-1 text-gray-400 block">Your teaching performance overview</span>
          </div>
        </div>

        <Link
          to="/courses"
          className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all"
        >
          + Create New Course
        </Link>
      </Motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <Motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}

            whileHover={{ scale: 1.05 }}
            className={`flex items-center justify-between p-6 rounded-2xl shadow-md bg-gradient-to-br ${stat.color} text-white`}
          >
            <div>
              <p className="text-sm opacity-80">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
            <div className="p-3 bg-white/20 rounded-full shadow-md">{stat.icon}</div>
          </Motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

        {/* Course Progress Chart */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Course Progress Overview
          </h3>

          {CourseProgressData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-10">
              No course data available
            </p>
          )}
        </Motion.div>

        {/* Enrollment Chart */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Student Enrollment Trends
          </h3>

          {EnrollData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-10">
              No enrollment data available
            </p>
          )}
        </Motion.div>

      </div>
    </div>
  );
}
