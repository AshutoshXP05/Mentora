import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BookOpen, Users, Star, IndianRupee } from "lucide-react";

export default function EducatorDashboard() {
    const { userData } = useSelector((state) => state.user);
    const { creatorCourseData } = useSelector((state) => state.course);

    const CourseProgressData = creatorCourseData?.map((course)=>({
        name: course.title?.slice(0,10) + "...",
        lectures:course.lectures?.length || 0,
    })) || [];

     const EnrollData = creatorCourseData?.map((course)=>({
        name: course.title?.slice(0,10) + "...",
        enrolled: course.enrolledStudents?.length || 0,
    })) || [];

    const barData = [
        { name: "AI Basics", students: 45 },
        { name: "Web Dev", students: 60 },
        { name: "Data Science", students: 30 },
        { name: "DSA Mastery", students: 50 },
    ];

    const lineData = [
        { month: "Jan", revenue: 5000 },
        { month: "Feb", revenue: 8000 },
        { month: "Mar", revenue: 12000 },
        { month: "Apr", revenue: 15000 },
        { month: "May", revenue: 18000 },
    ];

    const stats = [
        {
            label: "Total Students",
            value: "1.2K",
            icon: <Users />,
            color: "from-green-500 to-emerald-600",
        },
        {
            label: "Active Courses",
            value: "8",
            icon: <BookOpen />,
            color: "from-indigo-500 to-blue-600",
        },
        {
            label: "Average Rating",
            value: "4.7",
            icon: <Star />,
            color: "from-yellow-400 to-amber-500",
        },
        {
            label: "Total Revenue",
            value: "₹58,200",
            icon: <IndianRupee />,
            color: "from-pink-500 to-rose-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center mb-10">
                <div className="flex items-center gap-5">
                    <img
                        src={
                            userData?.photoUrl 
                        }
                        alt="profile"
                        className="w-20 h-20 rounded-full border-4 border-indigo-100 object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Welcome, {userData?.name || "Educator"} 👋
                        </h2>
                        <p className="text-gray-500">{userData?.email}</p>
                        <p className="text-sm mt-1 text-gray-400">Role: Educator</p>
                    </div>
                </div>
                <Link
                    to="/create-courses"
                    className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all"
                >
                    + Create New Course
                </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={`flex items-center justify-between p-6 rounded-2xl shadow-md bg-gradient-to-br ${stat.color} text-white`}
                    >
                        <div>
                            <p className="text-sm opacity-80">{stat.label}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                        <div className="p-3 bg-white/20 rounded-full">{stat.icon}</div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Course Enrollment Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="students" fill="#6366F1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Revenue Growth (Monthly)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Recent Enrollments
                </h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm">
                            <th className="p-3 text-left">Student</th>
                            <th className="p-3 text-left">Course</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            {
                                name: "Ananya Verma",
                                course: "AI Basics",
                                date: "Oct 20, 2025",
                                status: "Completed",
                            },
                            {
                                name: "Rohit Singh",
                                course: "Web Dev",
                                date: "Oct 18, 2025",
                                status: "In Progress",
                            },
                            {
                                name: "Neha Gupta",
                                course: "DSA Mastery",
                                date: "Oct 15, 2025",
                                status: "Completed",
                            },
                            {
                                name: "Karan Patel",
                                course: "Data Science",
                                date: "Oct 12, 2025",
                                status: "In Progress",
                            },
                        ].map((item, i) => (
                            <tr
                                key={i}
                                className="text-gray-700 text-sm border-b hover:bg-gray-50"
                            >
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.course}</td>
                                <td className="p-3">{item.date}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
