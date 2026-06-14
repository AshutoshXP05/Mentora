import React, { useEffect, useState } from "react";
import { ArrowLeft, Plus, Edit3, BookOpen, Video } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";

const CreateLecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const handleCreateLecture = async () => {
    if (!lectureTitle.trim())
      return toast.error("Lecture title is required");

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/lecture/createlecture/${id}`,
        { lectureTitle },
        { withCredentials: true }
      );

      dispatch(setLectureData([...lectureData, result.data.lecture]));
      toast.success("Lecture created successfully");
      setLectureTitle("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create lecture");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCourseLectures = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/lecture/courselecture/${id}`,
          { withCredentials: true }
        );
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
      }
    };
    getCourseLectures();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-8 border border-gray-200">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
            <BookOpen className="text-indigo-600" /> Add Lecture
          </h1>
          <p className="text-gray-600 mt-1">
            Add structured video lectures to enhance your course.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter lecture title..."
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleCreateLecture}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 flex items-center justify-center transition hover:cursor-pointer
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={25} color="white" />
            ) : (
              <span className="flex items-center">
                <Plus size={20} className="mr-2" /> Create
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Course
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Lectures ({lectureData?.length || 0})
        </h2>

        <div className="space-y-3">
          {!lectureData || lectureData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Video size={40} className="mx-auto mb-3 opacity-50" />
              No lectures added yet.
            </div>
          ) : (
            lectureData.map((lec, index) => (
              <div
                key={lec._id}
                className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3 group"
              >
                <p className="text-gray-800 font-medium">
                  <span className="text-indigo-600 font-bold">
                    Lecture {index + 1}:
                  </span>{" "}
                  {lec.lectureTitle}
                </p>

                <button
                  className="text-indigo-600 hover:text-indigo-800 transition"
                  onClick={() => navigate(`/editlecture/${id}/${lec._id}`)}
                >
                  <Edit3 size={18} className="group-hover:scale-110 transition" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
