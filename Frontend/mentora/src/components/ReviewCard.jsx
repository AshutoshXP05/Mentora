// import React from "react";
// import { FaRegStar, FaStar } from "react-icons/fa";
// import EmptyImage from "../assets/EmptyImage.jpg"

// function ReviewCard({ comment, rating, photoUrl, name, description, courseTitle}) {
//   // Create array to display stars dynamically
//   const stars = Array(5)
//     .fill(0)
//     .map((_, i) => (
//       <FaStar
//         key={1}
//         className={`text-lg ${i < rating ? <FaStar />  : <FaRegStar /> }`}
//       />
//     ));

//   return (
//     <div className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-xl p-6 flex flex-col justify-between border border-gray-100">
//       <div>


//       </div>
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//         <div className="flex items-center">{stars}</div>
//         <div className=""> Review for: {courseTitle} </div>
//         <div className=""> {comment} </div>
//         <div className="">
//             <img src={photoUrl || EmptyImage} className="" alt="" />
//         </div>
//         <div className="">
//             <h2 className="">{name}</h2>
//             <p className="">{description}</p>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default ReviewCard;


import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import EmptyImage from "../assets/EmptyImage.jpg";
import { useSelector } from "react-redux";

function ReviewCard({ comment, rating, photoUrl, name, description, courseTitle }) {
    // Generate star icons dynamically
    const { userData } = useSelector(state => state.user);
    console.log("user is ", userData)
    const stars = Array(5)
        .fill(0)
        .map((_, i) =>
            i < rating ? (
                <FaStar key={i} className="text-yellow-400 text-lg" />
            ) : (
                <FaRegStar key={i} className="text-gray-300 text-lg" />
            )
        );

    return (
        <div className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-xl p-6 border border-gray-100 flex flex-col gap-4">
            {/* Top Section - Course Title and Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                    Review for: <span className="text-blue-600">{courseTitle}</span>
                </h3>
                <div className="flex items-center">{stars}</div>
            </div>

            {/* Middle Section - Comment */}
            <p className="text-gray-600 text-sm leading-relaxed">{comment}</p>

            {/* Bottom Section - Reviewer Info */}
            <div className="flex items-center gap-4 mt-2">
                <img
                    src={photoUrl || EmptyImage}
                    alt={name}
                    className="w-12 h-12 object-cover rounded-full border border-gray-200 shadow-sm"
                />
                <div>
                    <h4 className="text-gray-800 font-bold">{name}</h4>
                    <p className="text-gray-500 text-sm">
                        {description === "educator" ? "Course Instructor" : description || "Learner"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;
