import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import EmptyImage from "../assets/EmptyImage.jpg";

export default function CardPage({ limit = 6 }) {
  const courseData = useSelector((state) => state.course.courseData);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    if (Array.isArray(courseData?.data)) {
      const uniqueCourses = Array.from(
        new Map(courseData.data.map((c) => [c._id, c])).values()
      );
      setPopularCourses(uniqueCourses.slice(0, limit));
    } else {
      setPopularCourses([]);
    }
  }, [courseData, limit]);

  if (!popularCourses.length) {
    return (
      <p className="text-center text-gray-500 mt-16">
        No courses available.
      </p>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-0 lg:px-8 mt-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6">
        Our Popular Courses
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto px-2">
        Explore top-rated courses designed to boost your skills, enhance your career, 
        and unlock opportunities in tech, AI, business, and beyond.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularCourses.map((course, index) => (
          <Card
            key={index}
            id={course._id}
            thumbnail={course.thumbnail || EmptyImage  }
            title={course.title}
            category={course.category}
            price={course.price}
            rating={course.rating}
            reviews={course.reviews}
          />
        ))}
      </div>
    </div>
  );
}