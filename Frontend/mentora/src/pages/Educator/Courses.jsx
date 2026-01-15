import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import useHandleDeleteCourse from "../../customHooks/useHandleDeleteCourse.js";

export default function Courses() {
  const { creatorCourseData } = useSelector((state) => state.course);
  const courses = creatorCourseData?.data || [];
  const navigate = useNavigate();
  const { handleDelete } = useHandleDeleteCourse();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-10 mt-6">

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-7 flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            My Courses
          </h2>
          <p className="text-gray-500 mt-1 text-m">
            Manage, edit, and publish your courses anytime.
          </p>
        </div>

        <Link
          to="/create-courses"
          className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
        >
          <PlusCircle size={22} />
          Create Course
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hidden md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
            <tr>
              <th className="px-6 py-4 text-left">Course</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-14 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                      className="w-24 opacity-70"
                    />
                    <p className="mt-4 font-medium text-base">No courses found.</p>
                    <Link
                      className="mt-2 text-indigo-600 hover:underline text-sm"
                      to="/create-courses"
                    >
                      Create your first course →
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                >
                
                  <td className="px-6 py-6 flex items-center gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-20 h-20 rounded-xl shadow-sm border border-gray-200 object-cover"
                    />
                    <span className="font-semibold text-gray-800 text-base">
                      {course.title}
                    </span>
                  </td>

                  <td className="px-6 py-6 text-gray-700 font-semibold text-lg">
                    ₹{course.price}
                  </td>

                  <td className="px-6 py-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                        course.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="px-6 py-6 text-right flex justify-end gap-5">
                    <button
                      onClick={() => navigate(`/editcourse/${course._id}`)}
                      className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <Edit size={22} />
                    </button>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="cursor-pointer  text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={22} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden grid gap-5 mt-6">
        {courses.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              className="w-20 mx-auto opacity-60"
            />
            <p className="mt-3 text-base">No courses found.</p>
          </div>
        ) : (
          courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-md p-5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-20 h-20 rounded-xl border border-gray-200 object-cover shadow-sm"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {course.title}
                  </h3>
                  <p className="text-gray-700 text-base font-semibold">
                    ₹{course.price}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                    course.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>

                <div className="flex gap-5">
                  <button
                    onClick={() => navigate(`/editcourse/${course._id}`)}
                    className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <Edit size={22} />
                  </button>

                  <button
                    onClick={() => handleDelete(course._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
