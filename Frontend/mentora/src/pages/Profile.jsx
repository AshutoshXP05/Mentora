import React from "react";
import { useSelector } from "react-redux";
import { Edit3, Mail, User, Shield, BookOpen } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const enrolledCourses = userData?.enrolledCourses?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl pb-10 relative overflow-hidden">

        {/* Header */}
        <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl relative">
          <button
            className="absolute top-4 left-4 p-2 rounded-full bg-white hover:bg-gray-100 shadow-md"
            onClick={() => navigate("/")}
          >
            <FaArrowLeftLong size={20} color="black" />
          </button>
        </div>

        {/* Profile Image */}
        <div className="relative -mt-16 flex flex-col items-center px-6">

          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-200"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-white shadow-lg text-5xl text-white font-bold bg-gray-700">
              {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          {/* Name / Role */}
          <h2 className="mt-4 text-3xl font-bold text-gray-800">{userData?.name}</h2>
          <p className="text-gray-500 text-lg capitalize">{userData?.role}</p>

          {/* Edit button */}
          <button
            onClick={() => navigate("/editprofile")}
            className="mt-4 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-10 border-t border-gray-200 pt-6 px-6 grid sm:grid-cols-2 gap-8">

          {/* Full Name */}
          <div className="flex items-center gap-3">
            <User className="text-blue-600" size={22} />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">{userData?.name || "Not Provided"}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-blue-600" size={22} />
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-gray-800">{userData?.email || "Not Provided"}</p>
            </div>
          </div>

          {userData?.role !== "educator" && (
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" size={22} />
              <div>
                <p className="text-sm text-gray-500">Enrolled Courses</p>
                <p className="font-medium text-gray-800">
                  {enrolledCourses} {enrolledCourses === 1 ? "Course" : "Courses"}
                </p>
              </div>
            </div>
          )}

          {/* Joined On */}
          <div className="flex items-center gap-3">
            <User className="text-blue-600" size={22} />
            <div>
              <p className="text-sm text-gray-500">Joined On</p>
              <p className="font-medium text-gray-800">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toDateString()
                  : "Not Available"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
