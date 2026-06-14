
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyImage from "../assets/EmptyImage.jpg";
export default function Card({ thumbnail, title, category, price, id, reviews }) {

    const { reviewData } = useSelector((state) => state.review);
    const navigate = useNavigate();

    const getAverageRating = (courseId) => {
        const courseReviews =
            reviews && Array.isArray(reviews) && reviews.length > 0
                ? reviews
                : reviewData.filter((r) => r.course?._id === courseId || r.course === courseId);

        if (!courseReviews || courseReviews.length === 0) return 0;

        const total = courseReviews.reduce((sum, r) => sum + (r.rating || 0), 0);
        return (total / courseReviews.length).toFixed(1);
    };

    return (
        <div className="w-80 rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white border border-gray-200 hover:-translate-y-2 group" onClick={() => navigate(`/viewcourse/${id}`)}>
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={thumbnail || EmptyImage}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-xs px-3 py-1 rounded-full shadow font-medium">
                    {category}
                </span>
            </div>
            <div className="p-5 flex flex-col gap-3">
                <h2 className="text-lg font-semibold line-clamp-2 leading-snug">
                    {title}
                </h2>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-bold text-gray-900">₹{price}</span>

                    <span className="text-sm bg-yellow-300 px-2 py-1 rounded-full font-medium shadow">
                        ⭐ {getAverageRating(id)}
                    </span>
                </div>
            </div>
        </div>
    ); 
}
