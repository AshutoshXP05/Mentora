import { useEffect, useState } from "react";
import { FaStar, FaPlayCircle, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import EmptyImage from "../assets/EmptyImage.jpg";
import axios from "axios";
import { serverUrl } from "../App";
import { fetchCreatorCourses } from "../utils/fetchCreatorCourses";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function ViewCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { courseData, selectedCourse, creatorCourseData } = useSelector(
    (state) => state.course
  );

  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Review states
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkEnrollment();

    if (courseData?.data && Array.isArray(courseData.data)) {
      const currentCourse = courseData.data.find((c) => c._id === id);
      if (currentCourse) {
        dispatch(setSelectedCourse(currentCourse));
      }
    }
  }, [courseData, id, dispatch, userData]);

  useEffect(() => {
    const loadCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const res = await axios.post(
            `${serverUrl}/api/course/creator`,
            { userId: selectedCourse.creator },
            { withCredentials: true }
          );
          setCreatorData(res.data);
        } catch (err) {
          console.log("Creator fetch error:", err);
        }
      }
    };
    loadCreator();
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse?.creator) {
      fetchCreatorCourses(dispatch, selectedCourse.creator);
    }
  }, [selectedCourse]);

  const checkEnrollment = () => {
    const enrolled = userData?.enrolledCourses?.some(
      (cid) =>
        (typeof cid === "string" ? cid : cid._id).toString() === id.toString()
    );

    if (enrolled) setIsEnrolled(true);
  };

  const handleEnroll = async (userId, id) => {
    try {
      const orderData = await axios.post(
        `${serverUrl}/api/payment/razorpay-order`,
        { userId, id },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "Mentora",
        description: "Course Enrollment Payment",
        order_id: orderData.data.id,
        handler: async (res) => {
          try {
            const verify = await axios.post(
              `${serverUrl}/api/payment/verifypayment`,
              {
                razorpay_order_id: res.razorpay_order_id,
                id,
                userId,
              },
              { withCredentials: true }
            );
            toast.success(verify.data.message);
            setIsEnrolled(true);
          } catch (err) {
            toast.error(err.response?.data?.message);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Enrollment failed.");
    }
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/review/createReview`,
        { rating, comment, id },
        { withCredentials: true }
      );
      toast.success("Review submitted!");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Review failed");
    } finally {
      setLoading(false);
    }
  };

  const avgRating = selectedCourse?.reviews?.length
    ? (
        selectedCourse.reviews.reduce((a, b) => a + b.rating, 0) /
        selectedCourse.reviews.length
      ).toFixed(1)
    : 0;

  if (!selectedCourse)
    return (
      <div className="h-screen flex justify-center items-center text-gray-500">
        Loading course…
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-16 lg:px-28 mt-8">

      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200">
        <div className="grid md:grid-cols-2">
          {/* Left: Image */}
          <div className="h-72 md:h-full relative">
            <img
              src={selectedCourse.thumbnail || EmptyImage}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 text-xs bg-white rounded-full shadow font-semibold">
              {selectedCourse.category}
            </span>
          </div>

          {/* Right */}
          <div className="p-8 flex flex-col justify-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCourse.title}
            </h1>
            {selectedCourse.subTitle && (
              <p className="text-gray-600 text-lg">{selectedCourse.subTitle}</p>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold">{avgRating}</span>
              <span>({selectedCourse.reviews?.length || 0} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl font-bold text-gray-900">
                ₹{selectedCourse.price}
              </span>
              {/* <span className="text-lg line-through text-gray-400">₹5999</span> */}
            </div>

            {!isEnrolled ? (
              <button
                onClick={() => handleEnroll(userData?._id, id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold mt-4 w-44"
              >
                Enroll Now
              </button>
            ) : (
              <button
                onClick={() => navigate(`/viewlecture/${id}`)}
                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold mt-4 w-44"
              >
                Watch Now
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-3xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-3">About this course</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {selectedCourse.description}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lecture list */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 max-h-[520px] overflow-y-auto">
            {selectedCourse?.lectures?.map((lec, index) => (
              <button
                key={lec._id}
                disabled={!lec.isPreviewFree}
                onClick={() => lec.isPreviewFree && setSelectedLecture(lec)}
                className={`
                  w-full flex justify-between py-3 px-3 rounded-lg mb-2 border transition-all
                  ${
                    lec.isPreviewFree
                      ? "hover:bg-indigo-50 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }
                  ${
                    selectedLecture?._id === lec._id
                      ? "bg-indigo-100 border-indigo-400"
                      : "border-gray-200"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {lec.isPreviewFree ? (
                    <FaPlayCircle className="text-indigo-600" />
                  ) : (
                    <FaLock className="text-gray-400" />
                  )}
                  {lec.lectureTitle}
                </div>
              </button>
            ))}
          </div>

          {/* Video */}
          <div className="bg-black rounded-2xl h-[520px] flex items-center justify-center p-4 text-white">
            {selectedLecture?.videoUrl ? (
              <video
                src={selectedLecture.videoUrl}
                controls
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              "Lecture is not selected or no preview available."
            )}
          </div>
        </div>
      </div>

      <div className="mt-14 bg-white rounded-3xl shadow p-6 border flex items-center gap-6">
        <img
          src={creatorData?.photoUrl || EmptyImage}
          className="w-24 h-24 rounded-full border object-cover shadow"
        />
        <div>
          <h3 className="text-xl font-bold">{creatorData?.name}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {creatorData?.description || "Instructor at Mentora LMS"}
          </p>
          <p className="text-gray-500 text-sm mt-1">{creatorData?.email}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Other Courses by the Educator
        </h2>

        {creatorCourseData?.data?.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {creatorCourseData.data
              .filter((c) => c._id !== id)
              .map((course) => (
                <Card key={course._id} {...course} />
              ))}
          </div>
        ) : (
          <p className="text-gray-500">No other published courses yet.</p>
        )}
      </div>

      <div className="mt-14 bg-white rounded-3xl shadow p-6 border">
        <h2 className="text-xl font-bold mb-3">Write a Review</h2>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={25}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className={`cursor-pointer transition ${
                (hover || rating) >= star
                  ? "text-yellow-400 scale-110"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500"
          rows={4}
          placeholder="Write your review..."
        ></textarea>

        <button
          onClick={handleReview}
          disabled={loading}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? <ClipLoader size={24} color="white" /> : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
