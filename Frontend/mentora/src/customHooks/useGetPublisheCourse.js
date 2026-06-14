
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../redux/courseSlice'

const useGetPublisheCourse = () => {
   
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const getCourseData = async () => {
            try {
                setLoading(true);
                const result = await axios.get(`${serverUrl}/api/course/getpublished`, {withCredentials: true});
                console.log('Published Courses:', result.data);
                // The backend returns data wrapped in ApiResponse structure
                dispatch(setCourseData(result.data));
            } 
            catch (error) {
                console.log('Error fetching published courses:', error)
            }
            finally {
                setLoading(false);
            }
        }
        getCourseData();
    }, [dispatch])

    return loading;
}

export default useGetPublisheCourse