import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { setCourseData } from "../redux/courseSlice.js";
import { fetchCreatorCourses } from "../utils/fetchCreatorCourses.jsx";
import { useNavigate } from "react-router-dom";

const useHandleDeleteCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this course?")) return;
    try {
      const res = await axios.delete(`${serverUrl}/api/course/remove/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Course deleted successfully!");
        if (courseData?.data && Array.isArray(courseData.data)) {
          const updatedData = courseData.data.filter(
            (course) => course._id !== id
          );

          const updatedCourseData = {
            ...courseData,
            data: updatedData,
          };

          dispatch(setCourseData(updatedCourseData));
            navigate("/courses");
        } else {
          console.warn("Unexpected courseData format:", courseData);
        }

         if (userData?._id) {
          await fetchCreatorCourses(dispatch, userData._id);
        }
        return;
      }

      toast.error("Failed to delete course.");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong while deleting.");
    }
  };

  return { handleDelete };
};

export default useHandleDeleteCourse;
