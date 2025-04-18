import React, { useEffect, useState } from 'react';
import { showAllCourses } from '../../../../services/api';
import Course from './Course/Course';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditCourse, setStep } from '../../../../Reducer/slices/courseslice';

function MyCourses() {
    const [courses, setCourses] = useState(null);
    const[courseDeleted,setCourseDeleted] = useState(false);
     const {user} = useSelector((state)=>state.profile);
     const navigate = useNavigate();

    useEffect(() => {
        async function fetchCourses() {
            const result = await showAllCourses();
            let filteredCourses =  result.filter((course)=>(course.instructor._id === user._id));
            setCourses(filteredCourses);;
        }
        setCourseDeleted(false);

      

        fetchCourses();
    }, [courseDeleted]);

    if (courses === null) {
        return (
            <div>
                No Courses
            </div>
        );
    }

    return (
    
            <div className='text-white flex flex-col py-6 '>
                <div className=' flex justify-between py-4'>
                    <p className=' text-2xl'>My Courses</p>
                    
                    <button onClick={()=>{navigate('/dashboard/add-course');setStep(1);setEditCourse(false);}} className=' self-end bg-yellow-50  text-black px-2 py-1 rounded-md'> Add Course <span className=' text-2xl'></span>+ </button>
                </div>
                <div className=' '> 
                    <div className='px-1 w-full flex  border border-richblack-700 py-1 justify-between items-center '>
                        <p>Courses</p>
                  <div className=' flex  gap-8 pr-4'>
                    <p>Durations</p>
                    <p>Prices</p>
                    <p>Actions</p> 
                    </div>   
                </div>
                </div>
                {courses.map((course) => (
                    <Course key={course._id} course={course} setCourseDeleted={setCourseDeleted} />
                ))}
            </div>
       
    );
}

export default MyCourses;
