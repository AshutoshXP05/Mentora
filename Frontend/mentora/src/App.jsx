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
import AllCourses from './pages/Allcourses.jsx'
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
   useGetCurrentUser();
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
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
            <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/signup"} />} />
            <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />

            <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} />
            <Route path='/courses' element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />} />
            <Route path='/create-courses' element={userData?.role === "educator" ? <CreateCourse /> : <Navigate to={"/signup"} />} />
            <Route path='/editcourse/:id' element={userData?.role === "educator" ? <EditCourse /> : <Navigate to={"/signup"} />} />
            {/* <Route path='/lecture' element={userData?.role === "educator" ? <Lecture /> : <Navigate to={"/signup"} />} /> */}
            <Route path='/allcourses' element={userData? <AllCourses /> : <Navigate to={"/signup"} />} />
            <Route path='/viewcourse/:id' element={userData? <ViewCourse /> : <Navigate to={"/signup"} />} />

            <Route path='/createlecture/:id' element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />} />
            <Route path='/editlecture/:id/:lectureId' element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/signup"} />} />
            <Route path='/viewlecture/:id' element={userData? <ViewLecture /> : <Navigate to={"/signup"} />} />
            <Route path='/mycourses' element={userData ? <MyEnrolledCourse /> : <Navigate to={"/signup"} />} />
            {/* <Route path='/mycourses' element={userData ? <MyEnrolledCourse /> : <Navigate to={"/signup"} />} /> */}
            
            

            <Route path="*" element={<Navigate to="/" />} />
         </Routes>


      </>
   )
}

export default App
