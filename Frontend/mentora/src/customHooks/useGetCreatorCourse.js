import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatorCourses } from "../utils/fetchCreatorCourses";

export default function useGetCreatorCourse() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?._id) {
      fetchCreatorCourses(dispatch, userData._id);
    }
  }, [userData]);
}
