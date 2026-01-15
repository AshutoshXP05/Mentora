import { useState } from "react";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CloudUpload } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../../App.jsx";
import { toast } from "react-toastify";
import { fetchCreatorCourses } from "../../utils/fetchCreatorCourses.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function CreateCourse() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    otherCategory: "",
    price: "",
    thumbnail: null,
    description: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const courseData = new FormData();
      courseData.append("title", formData.title);
      courseData.append(
        "category",
        formData.category === "Other" ? formData.otherCategory : formData.category
      );
      courseData.append("price", formData.price);
      courseData.append("thumbnail", formData.thumbnail);
      courseData.append("description", formData.description);

      const result = await axios.post(`${serverUrl}/api/course/create`, courseData, { withCredentials: true, })

      await fetchCreatorCourses(dispatch, userData._id);
      console.log("Course Data Submitted:", result);
      toast.success("Course created successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error(error?.response?.data?.message || "Course creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 min-h-screen bg-gray-50 py-10 px-5 md:px-10 w">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Create a New Course
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in the details below to launch your course.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto"
      >
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter course title"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              <span className="text-gray-400">Select Category</span>
            </option>
            <option value="AI Basics">AI Basics</option>
            <option value="Web Dev">Web Dev</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Data Science">Data Science</option>
            <option value="DSA Mastery">DSA Mastery</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Conditional Other Category */}
        {formData.category === "Other" && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Specify Other Category
            </label>
            <input
              type="text"
              name="otherCategory"
              value={formData.otherCategory}
              onChange={handleChange}
              required
              placeholder="Enter your category"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            placeholder="Enter course price"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Course Thumbnail
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
              <CloudUpload className="text-gray-500" />
              <span className="text-gray-700">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </label>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Preview"
                className="w-20 h-20 rounded-lg object-cover border"
              />
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Course Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Write a detailed course description..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
