import React, { useEffect, useState } from 'react'
import { fetchInstructorCourses, instructorDashboard } from '../../../../services/api';
import { useSelector } from 'react-redux';
import InstructorChart from './InstructorChart';

function Instructor() {
   const [loading, setLoading] = useState(false);
   const [instructorData, setInstructorData] = useState(null);
   const [courses, setCourses] = useState([]);
   const [active, setActive] = useState(false);
   const [viewAllCourses, setViewAllCourses] = useState([]);
   const { token } = useSelector((state) => state.auth);
   const { user } = useSelector((state) => state.profile);

   useEffect(() => {
       const getCourseDataWithStats = async () => {
           setLoading(true);
           try {
               const instructorApiData = await instructorDashboard(token);
               const result = await fetchInstructorCourses(token);

               console.log("instructorApi Data ", instructorApiData);
// 
               if (instructorApiData.length) {
                   setInstructorData(instructorApiData);
               }
               if (result) {
                   setCourses(result);
                   setViewAllCourses(result.slice(0, 3)); // Set initial view to the first 3 courses
               }
           } catch (error) {
               console.error("Error fetching data", error);
           } finally {
               setLoading(false);
           }
       }
       getCourseDataWithStats();
   }, [token]);

   const handleViewAll = () => {
       if (!active) {
           setViewAllCourses(courses);
       } else {
           setViewAllCourses(courses.slice(0, 3));
       }
       setActive(!active);
   }

//    console.log("Courses -- ", courses);

   const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenrated, 0);
   const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

   return (
       <div className='pt-8 text-white'>
           <div className='flex flex-col gap-2'>
               <p className='flex gap-4 items-center text-lg font-semibold'>
                   Hii <p className='text-lg'>👋</p><div>{user.firstName}</div>
               </p>
               <p className='text-richblack-200'>Let's start something new</p>
           </div>
           {
               loading ? (
                   <div className='pulse'>Loading </div>
               ) : courses.length > 0 ? (
                   <div>
                       <div className='flex justify-between items-center'>
                        <div>
                           <InstructorChart courses={instructorData}   />
                        </div>
                           <div className='bg-richblack-800 px-2 py-4'>
                               <p className='text-2xl font-semibold py-2'>Statistics </p>
                               <div className='flex gap-x-6 py-2'>
                                   <p className='text-richblack-100 text-lg'>Total Courses</p>
                                   <div className='font-semibold'>{courses.length}</div>
                               </div>
                               <div className='flex gap-x-6 py-2'>
                                   <p className='text-richblack-100 text-lg'>Total Students</p>
                                   <p className='font-semibold'>{totalStudents}</p>
                               </div>
                               <div className='flex gap-x-6 py-2'>
                                   <p className='text-richblack-100 text-lg'>Total Income</p>
                                   <p className='font-semibold'>{totalAmount}</p>
                               </div>
                           </div>
                       </div>
                   </div>
               ) : (
                   <div> Length is 0</div>
               )
           }

           {/* List of Courses */}
           <div className='bg-richblack-800 px-2 py-6 rounded-sm flex flex-col mt-4'>
               <button onClick={handleViewAll} className='text-yellow-50 font-semibold self-end pr-4 py-4'>
                   {!active ? <p>View All</p> : <p>View Less</p>}
               </button>
               <div className='flex gap-6 flex-wrap'>
                   {
                       viewAllCourses.map((course, index) => (
                           <div key={index}>
                               <img src={course.tumbnail} alt='course Thumbnail'
                                   className='w-[300px] h-[200px]'
                               />
                               <div className='py-2 text-richblack-200'>
                                   {course.courseName}
                               </div>
                               <div className='flex gap-2 py-2 text-richblack-200'>
                                   <p>{instructorData.totalStudentsEnrolled} students |</p>
                                   <p>Rs. {course.price}</p>
                               </div>
                           </div>
                       ))
                   }
               </div>
           </div>
       </div>
   )
}

export default Instructor;
