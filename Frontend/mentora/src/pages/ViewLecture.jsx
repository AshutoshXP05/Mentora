import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";

const ViewLecture = () => {
  const { id } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const selectedCourse = courseData?.data.find((course) => course._id === id);
  const navigate = useNavigate();
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            `${serverUrl}/api/course/creator`,
            { userId: selectedCourse.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
        } catch (error) {
          console.log("Error fetching creator info:", error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* === Left Section (Video Area) === */}
      <div className="flex-1 bg-white shadow-md rounded-none md:rounded-r-3xl p-4 md:p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <IoMdArrowRoundBack size={22} />
            </button>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">
              {selectedCourse?.title || "Course Title"}
            </h1>
          </div>

          <div className="text-sm text-gray-500 flex gap-4">
            <span>Category: {selectedCourse?.category || "N/A"}</span>
            <span>Level: {selectedCourse?.level || "Beginner"}</span>
          </div>
        </div>

        {/* Video Section */}
        <div className="flex-1 flex lg:space-y-5 justify-center items-center bg-black/95 rounded-2xl overflow-hidden shadow-inner relative border border-gray-800">
          {selectedLecture ? (
            <video
              key={selectedLecture?._id}
              src={selectedLecture?.videoUrl}
              controls
              className="w-full h-[60vh] lg:h-[75vh] object-fill rounded-xl"
            />
          ) : (
            <div className="text-white flex flex-col items-center py-20">
              <FaPlayCircle size={60} className="text-gray-400 mb-3" />
              <p className="text-gray-300 text-sm md:text-base">
                Select a lecture to start watching
              </p>
            </div>
          )}
        </div>

        {/* Lecture Info */}
        {selectedLecture && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedLecture?.lectureTitle || selectedLecture?.title}
            </h2>
          </div>
        )}
      </div>

      {/* === Right Section (Lectures Sidebar) === */}
      <div className="w-full md:w-[420px] lg:w-[450px] bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col shadow-inner">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            All Lectures
          </h3>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {selectedCourse?.lectures?.length > 0 ? (
              selectedCourse.lectures.map((lecture, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${
                    selectedLecture?._id === lecture._id
                      ? "bg-green-100 border-green-400"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaPlayCircle
                      className={`text-lg ${
                        selectedLecture?._id === lecture._id
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        selectedLecture?._id === lecture._id
                          ? "text-gray-800"
                          : "text-gray-600"
                      }`}
                    >
                      {lecture.lectureTitle || lecture.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {lecture.duration || ""}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No lectures available</p>
            )}
          </div>
        </div>

        {/* Instructor Section */}
        {creatorData && (
          <div className="p-6 border-t mt-5 border-gray-200 bg-gradient-to-b from-white to-gray-50 rounded-b-3xl">
            <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
              👨‍🏫 Instructor
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={creatorData?.photoUrl || "https://via.placeholder.com/150"}
                alt={creatorData.name}
                className="w-16 h-16 hi rounded-full object-cover shadow-md"
              />
              <div className="flex flex-col">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 capitalize">
                  {creatorData.name}
                </h2>
                <p className="text-sm text-gray-500 capitalize">
                  {creatorData?.role || "Educator"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {creatorData.email}
                </p>
              </div>
            </div>
            {creatorData.description && (
              <p className="text-sm text-gray-500 mt-3 border-l-2 border-green-400 pl-3 italic">
                {creatorData?.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLecture;
