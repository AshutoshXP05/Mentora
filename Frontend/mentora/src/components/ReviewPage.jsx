// import React from "react";
// import ReviewCard from "./ReviewCard";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { useEffect } from "react";

// function ReviewPage() {

//   const {reviewData} = useSelector((state) => state.review);

//   const [latestReview, setLatestReview] = useState(null);

//   useEffect( () => {
//     setLatestReview(reviewData?.slice(0,6))
//   }, [reviewData])

//   console.log("LatestReview : ", latestReview)


//   return (
//     <section className="min-h-screen bg-gray-50 py-16 px-4 sm:px-8 lg:px-12">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
//           Real Reviews for Real Courses
//         </h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Hear what our learners have to say! These reviews come directly from
//           students and professionals who have gained real skills and advanced
//           their careers through our courses.
//         </p>
//       </div>

//       {/* Review Cards Grid */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {latestReview?.map((review, index) => (
//           <ReviewCard key={index} comment={review.comment} rating={review.rating} photoUrl={review.user.photoUrl} courseTitle={review.course.title} description={review.user.description} name={review.user.name} />
//         ))}
//       </div>

//       {/* Footer Text */}
//       <div className="text-center mt-16 text-gray-500 text-sm">
//         © {new Date().getFullYear()} Virtual Courses — Empowering Learners
//         Worldwide 🌎
//       </div>
//     </section>
//   );
// }

// export default ReviewPage;


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";
import EmptyImage from "../assets/EmptyImage.jpg";

function ReviewPage() {
  const { reviewData } = useSelector((state) => state.review);

  const [latestReview, setLatestReview] = useState([]);

  useEffect(() => {
    if (reviewData && reviewData.length > 0) {
      // Show only the latest 6 reviews
      setLatestReview(reviewData.slice(0, 6));
    }
  }, [reviewData]);

  console.log("LatestReview :", latestReview);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 sm:px-8 lg:px-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Real Reviews for Real Courses
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear what our learners have to say! These reviews come directly from
          students and professionals who have gained real skills and advanced
          their careers through our courses.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestReview && latestReview.length > 0 ? (
          latestReview.map((review, index) => (
            <ReviewCard
              key={review._id || index}
              comment={review?.comment || "No comment available"}
              rating={review?.rating || 0}
              photoUrl={review?.user?.photoUrl || EmptyImage}
              courseTitle={review?.course?.title || "Untitled Course"}
              description={review?.user?.description || review?.user?.role || "Student"}
              name={review?.user?.name || "Anonymous"}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-20">
            No reviews available yet.
          </div>
        )}
      </div>

      {/* Footer Text */}
      <div className="text-center mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Virtual Courses — Empowering Learners
        Worldwide 🌎
      </div>
    </section>
  );
}

export default ReviewPage;
