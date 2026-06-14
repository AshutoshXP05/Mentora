import React from 'react'
import Signup from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import useGetCurrentUser from './customHooks/useGetCurrentUser.js'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Dashboard from './pages/Educator/Dashboard.jsx'
import Courses from './pages/Educator/Courses.jsx'
import CreateCourse from './pages/Educator/CreateCourse.jsx'
import useGetCreatorCourse from './customHooks/useGetCreatorCourse.js'
import EditCourse from './pages/Educator/EditCourse.jsx'
import useGetPublisheCourse from './customHooks/useGetPublisheCourse.js'
import AllCourses from './pages/AllCourses.jsx'
import CreateLecture from './pages/Educator/CreateLecture.jsx'
import EditLecture from './pages/Educator/EditLecture.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import ScroolToTop from './components/ScroolToTop.jsx'
import ViewLecture from './pages/ViewLecture.jsx'
import MyEnrolledCourse from './pages/MyEnrolledCourse.jsx'
import About from './components/About.jsx'
import useGetAllReviews from './customHooks/useGetAllReviews.js'
export const serverUrl = "http://localhost:8000"
function App() {
   useGetCreatorCourse();
   useGetPublisheCourse();
   useGetAllReviews();

   const loadingUser = useGetCurrentUser();
   const { userData } = useSelector(state => state.user);

    if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }
   return (
      <>
         <ToastContainer />
         <ScroolToTop />
         <Routes>
            {/* <Route element={<AppLayout />} /> */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={!userData ? <Signup /> : <Navigate to={"/"} />} />
            <Route path='/login' element={!userData ? <Login /> : <Navigate to={"/"} />} />
            <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/login"} />} />
            <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
            <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/login"} />} />

            <Route path='/dashboard' element={userData ? (userData.role === "educator" ? <Dashboard /> : <Navigate to={"/"} />) : <Navigate to={"/login"} />} />
            <Route path='/courses' element={userData ? (userData.role === "educator" ? <Courses /> : <Navigate to={"/"} />) : <Navigate to={"/login"} />} />
            <Route path='/create-courses' element={userData ? (userData.role === "educator" ? <CreateCourse /> : <Navigate to={"/"} />) : <Navigate to={"/login"} />} />
            <Route path='/editcourse/:id' element={userData ? (userData.role === "educator" ? <EditCourse /> : <Navigate to={"/"} />) : <Navigate to={"/login"} />} />
            {/* <Route path='/lecture' element={userData ? (userData.role === "educator" ? <Lecture /> : <Navigate to={"/"} />) : <Navigate to={"/login"} />} /> */}
            <Route path='/allcourses' element={userData ? <AllCourses /> : <Navigate to={"/login"} />} />
            <Route path='/viewcourse/:id' element={userData ? <ViewCourse /> : <Navigate to={"/login"} />} />

            <Route path='/createlecture/:id' element={userData ? (userData.role === "educator" ? <CreateLecture /> : <Navigate to={"/"} />) : <Navigate to={"/login"} />} />
            <Route path='/editlecture/:id/:lectureId' element={userData ? (userData.role === "educator" ? <EditLecture /> : <Navigate to={"/"} />) : <Navigate to={"/login"} />} />
            <Route path='/viewlecture/:id' element={userData ? <ViewLecture /> : <Navigate to={"/login"} />} />
            <Route path='/mycourses' element={userData ? (userData.role !== "educator" ? <MyEnrolledCourse /> : <Navigate to={"/courses"} />) : <Navigate to={"/login"} />} />
            
            

            <Route path="*" element={<Navigate to="/" />} />
         </Routes>


      </>
   )
}

export default App
