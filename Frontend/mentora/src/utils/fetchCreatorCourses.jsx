import axios from "axios";
import { setCreatorCourseData } from "../redux/courseSlice";
import { serverUrl } from "../App";

export const fetchCreatorCourses = async (dispatch, userId) => {
  try {
    const result = await axios.get(
      `${serverUrl}/api/course/getcreator/${userId}`,
      { withCredentials: true }
    );
    dispatch(setCreatorCourseData(result.data));
  } catch (err) {
    console.log(err);
  }
};
