import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import CourseDetails from "./pages/CourseDetails";
import HomePage from './pages/Home';
import NavBAr from "./components/common/Navbar";
import Login from "./components/core/Login";
import Signup from "./components/core/Signup";
import { useState } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ProfileDropDowwn from "./components/core/Auth/ProfileDropDown";
import AboutUs from './pages/AboutUs'
import MyProfile from "./components/core/DashBoard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import EnrolledCourses from "./components/core/DashBoard/EnrolledCourses";
import Cart from "./components/core/DashBoard/Cart";
import { useSelector } from "react-redux";
import Settings from "./components/core/DashBoard/Settings/Index";
import AddCourse from "./components/core/DashBoard/AddCourse";
import MyCourses from "./components/core/DashBoard/MyCourses";
import Catalog from "./pages/Catalog";
import ViewCourse from "./pages/ViewCourse";
import { ACCOUNT_TYPE } from "./utils/constants";
import VideoDetailsSidebar from "./components/core/ViewCourse/VideoDetailsSidebar";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/DashBoard/InstructorDashboard/Instructor";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
function App() {  
  const user = useSelector((state)=>state.profile) 
  const [isLoggendIn,setIsLoggedIn] = useState(false);
  return (
    <div className=" relative w-screen min-h-screen  bg-richblack-900 flex flex-col font-inter">
      <NavBAr/>
      <Routes>
        <Route path='*' element={<Error/>}></Route>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<ContactUs/>}></Route>
        <Route path="/login" element={<Login  isLoggendIn={isLoggendIn} setIsLoggedIn={setIsLoggedIn}></Login>}></Route>

            <Route path="/signup" element={<Signup isLoggendIn={isLoggendIn} setIsLoggedIn = {setIsLoggedIn}></Signup>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
            <Route path="/verify-email" element={<VerifyEmail/>}></Route>
             <Route path="/about" element={<AboutUs></AboutUs>}></Route>
            



            
            <Route  element={
              <PrivateRoute>
                   <Dashboard/>
              </PrivateRoute>
           

            }>

              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}></Route>
           <Route path="/dashboard/cart" element={<Cart/> }></Route>
           
           <Route path="/dashboard/my-profile" element={<MyProfile/>}></Route>
            {
              user?.accountType === "Student" 
            }

            <Route path="/dashboard/settings" element={<Settings/>}></Route>
            <Route path="/dashboard/add-course" element={<AddCourse/>}></Route>
            <Route  path="/dashboard/my-courses" element={<MyCourses/>}></Route>
            <Route path='/dashboard/instructor' element={<Instructor/>}></Route>
            
          </Route>

          <Route
           path="/catalog/:catalogName"
           element={<Catalog/>}
          ></Route>

          <Route path="/courses/:courseId" 
           element={<CourseDetails/>}
          ></Route>

          <Route element={
              <ViewCourse/>
          }>

            
             
                 <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails/>}
                 >

                 </Route>
            
              
            

          </Route>

      </Routes>
      
    </div>
  );
}

export default App;


// 1:35
