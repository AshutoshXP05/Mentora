import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CloudUpload, ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatorCourses } from "../../utils/fetchCreatorCourses";
import { ClipLoader } from "react-spinners";
import { setCourseData } from "../../redux/courseSlice.js";
import useHandleDeleteCourse from "../../customHooks/useHandleDeleteCourse.js";
import EmptyImage from "../../assets/empty.jpg"

export default function EditCourse() {
  const { userData } = useSelector((state) => state.user);
  const { courseData } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    otherCategory: "",
    level: "",
    price: "",
    thumbnail: null,
    isPublished: false,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleDelete } = useHandleDeleteCourse();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/course/getcourse/${id}`, {
          withCredentials: true,
        });

        const course = res.data.data;
        setSelectedCourse(course);
        // console.log("CourseData is ", courseData);
        // console.log("CourseData.data is ", courseData.data);
        setFormData({
          title: course.title || "",
          subTitle: course.subTitle || "",
          description: course.description || "",
          category: ["AI Basics", "Web Dev", "Data Science", "DSA Mastery"].includes(course.category)
            ? course.category
            : "Other",
          otherCategory: ["AI Basics", "Web Dev", "Data Science", "DSA Mastery"].includes(course.category)
            ? ""
            : course.category,
          level: course.level || "",
          price: course.price || "",
          thumbnail: null,
          isPublished: course.isPublished || false,
        });
        setThumbnailPreview(course.thumbnail || EmptyImage);
      } catch (err) {
        toast.error("Failed to load course data");
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const togglePublish = () => {
    setFormData((prev) => ({ ...prev, isPublished: !prev.isPublished }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("subTitle", formData.subTitle);
      data.append("description", formData.description);
      data.append(
        "category",
        formData.category === "Other" ? formData.otherCategory : formData.category
      );
      data.append("level", formData.level);
      data.append("price", formData.price);
      data.append("isPublished", formData.isPublished);
      if (formData.thumbnail) data.append("thumbnail", formData.thumbnail);

      const result = await axios.post(`${serverUrl}/api/course/edit/${id}`, data, {
        withCredentials: true,
      });

      const updated = result.data.data;
console.log("Updated " , updated );
      if ( updated.isPublished ) {
        const updateCourses = courseData?.data.map((c) => c._id === id ? updated : c  )
        if ( !courseData?.data.some(c => c._id === id) ) {
          updateCourses.push(updated)
        }
        dispatch(setCourseData({ ...courseData, data: updateCourses }));
      }
      else {
        const filteredCourses = courseData?.data.filter((c) => c._id !== id);
        dispatch(setCourseData({ ...courseData, data: filteredCourses }));
      }
      fetchCreatorCourses(dispatch, userData._id);
      toast.success("Course updated successfully!");
      navigate("/courses");
    } catch (err) {
      console.log("Update Failed", err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 mt-6">

      {/* Header */}
      <div className="mt-4 flex justify-between items-center mb-10">
        <button
          // onClick={() => navigate(`/lectures/${id}`)}
          onClick={() => navigate("/courses")}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow"
        >
          <ArrowLeft size={22} className="text-gray-700" />
        </button>

        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Edit Course
        </h1>

        <button
          onClick={() => navigate(`/createlecture/${selectedCourse?._id}`)}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow font-semibold"
        >
          Manage Lectures
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-8 md:p-12 border border-gray-200 max-w-4xl mx-auto">

        <div className="flex justify-between mb-8">
          <button
            onClick={togglePublish}
            className={`px-6 py-3 rounded-xl font-semibold shadow transition ${
              formData.isPublished
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {formData.isPublished ? "Published" : "Publish Course"}
          </button>

          <button
            onClick={() => handleDelete(id)}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow"
          >
            Remove Course
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Course Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Subtitle</label>
              <input
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                placeholder="Course subtitle"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 mb-1 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 ring-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 ring-indigo-500 outline-none"
              >
                <option value="">Select Category</option>
                <option value="AI Basics">AI Basics</option>
                <option value="Web Dev">Web Dev</option>
                <option value="Data Science">Data Science</option>
                <option value="DSA Mastery">DSA Mastery</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.category === "Other" && (
              <div>
                <label className="font-semibold text-gray-700 mb-1 block">Specify Category</label>
                <input
                  name="otherCategory"
                  value={formData.otherCategory}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 ring-indigo-500 outline-none"
                />
              </div>
            )}

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 ring-indigo-500 outline-none"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Price (₹)</label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Course Thumbnail</label>

            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl cursor-pointer transition shadow">
                <CloudUpload className="text-gray-600" />
                <span>Upload Image</span>
                <input type="file" accept="image/*" onChange={handleThumbnailChange} hidden />
              </label>

              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  className="w-32 h-32 rounded-xl object-cover shadow border"
                />
              )}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => navigate("/courses")}
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow flex items-center gap-2 transition disabled:opacity-50"
            >
              <ClipLoader size={18} color="#fff" loading={loading} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
