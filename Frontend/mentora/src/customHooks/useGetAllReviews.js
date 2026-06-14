
import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux';
import { setReviewData } from '../redux/reviewSlice';

const useGetAllReviews = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/review/getReviews`, {withCredentials: true});
            dispatch(setReviewData(result.data));
            console.log("All Reviews ", result.data)
        } 
        catch (error) {
            console.log(error)
        }
    }
    allReviews();
  }, [dispatch])
}

export default useGetAllReviews