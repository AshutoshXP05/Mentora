import { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Save, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLectureData } from "../../redux/lectureSlice.js";

const EditLecture = () => {
  const { id, lectureId } = useParams();
  const navigate = useNavigate();
  const { lectureData } = useSelector((state) => state.lecture);

  const dispatch = useDispatch();
  const selectedLecture = lectureData?.find((lec) => lec._id === lectureId);

  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    if (!selectedLecture) {
      const getCourseLectures = async () => {
        try {
          const result = await axios.get(
            `${serverUrl}/api/lecture/courselecture/${id}`,
            { withCredentials: true }
          );
          dispatch(setLectureData(result.data.lectures));
        } catch (error) {
          console.log("Error loading course lectures:", error);
        }
      };
      getCourseLectures();
    }
  }, [id, dispatch, selectedLecture]);

  useEffect(() => {
    if (selectedLecture) {
      setLectureTitle(selectedLecture.lectureTitle || "");
      setIsPreviewFree(selectedLecture.isPreviewFree || false);
    }
  }, [selectedLecture]);

  const handleEditLecture = async () => {
    if (!lectureTitle.trim()) return toast.error("Lecture title is required");

    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    formData.append("isPreviewFree", isPreviewFree);
    if (videoUrl) formData.append("videoUrl", videoUrl);

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/lecture/editlecture/${lectureId}`,
        formData,
        { withCredentials: true }
      );

      dispatch(
        setLectureData(
          lectureData.map((lec) =>
            lec._id === lectureId ? result.data : lec
          )
        )
      );

      toast.success("Lecture updated successfully");
      navigate(`/createlecture/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update lecture");
    } finally {
      setLoading(false);
    }
  };

  const removeLecture = async () => {
    setRemoveLoading(true);
    try {
      await axios.delete(`${serverUrl}/api/lecture/removelecture/${lectureId}`, {
        withCredentials: true,
      });

      toast.success("Lecture removed successfully");
      navigate(`/createlecture/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6">

      <div className="bg-white backdrop-blur-xl w-full max-w-3xl rounded-3xl shadow-2xl p-10 border border-gray-200">

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Edit Lecture
        </h1>

        {/* Lecture Title */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">
            Lecture Title
          </label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter updated lecture title"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Video Upload Box */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Video
          </label>

          <div className="border-2 border-dashed border-indigo-300 rounded-xl p-6 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Upload className="text-indigo-600" />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoUrl(e.target.files[0])}
                className="text-gray-700 cursor-pointer"
              />
            </div>

            {videoUrl && (
              <p className="mt-3 text-sm text-indigo-700 font-medium">
                Selected: {videoUrl.name}
              </p>
            )}
          </div>

          {loading && (
            <p className="text-sm text-gray-500 mt-2">
              Uploading video... please wait.
            </p>
          )}
        </div>

        <div className="flex items-center mb-10">
          <input
            type="checkbox"
            checked={isPreviewFree}
            onChange={() => setIsPreviewFree((prev) => !prev)}
            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-3 text-gray-700 font-medium">
            Make this video FREE preview
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <button
            onClick={handleEditLecture}
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3
                       flex items-center justify-center transition shadow-md"
          >
            {loading ? (
              <ClipLoader size={24} color="white" />
            ) : (
              <>
                <Save size={18} className="mr-2" /> Save Changes
              </>
            )}
          </button>

          <button
            onClick={removeLecture}
            disabled={removeLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-3
                       flex items-center justify-center transition shadow-md"
          >
            {removeLoading ? (
              <ClipLoader size={24} color="white" />
            ) : (
              <>
                <Trash2 size={18} className="mr-2" /> Remove Lecture
              </>
            )}
          </button>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate(`/editcourse/${id}`)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
