import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../Reducer/slices/courseslice';
import { useNavigate } from 'react-router-dom';
import { deleteCourse as deleteCourseApi } from '../../../../../services/api';
import ConformationModal from '../../../../common/ConformationModal';

function Course({ course, setCourseDeleted }) {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    console.log(course);
    let totalTimeInSeconds = 0;

    course?.courseContent?.forEach(section => {
        section?.subSection?.forEach(subSection => {
            totalTimeInSeconds += Number(subSection?.timeDuration) || 0;
        });
    });

    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const formattedTime = `${hours}hr ${minutes}min`;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function editHandler() {
        dispatch(setCourse(course));
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
        navigate('/dashboard/add-course');
    }

    async function deleteHandler() {
        setModalData({
            text1: "Are You Sure?",
            text2: "You will be deleting this course permanently.",
            btn1Text: "Delete",
            btn2Text: "Cancel",
            btn1Handler: async () => {
                await deleteCourse();
                setShowModal(false);
            },
            btn2Handler: () => setShowModal(false)
        });
        setShowModal(true);
        console.log('deleteCourse');
    }

    async function deleteCourse() {
        await deleteCourseApi({
            courseId: course._id,
        });
        setCourseDeleted(true);
    }

    return (
        <div className='w-full flex justify-between items-center px-8 py-4 text-white border border-richblack-700'>
            <div className='flex gap-2'>
                <div className='border py-1 px-2 border-richblack-700 w-[250px]'>
                    <img
                        src={course?.tumbnail}
                        alt={`${course?.courseName} thumbnail`}
                        className='w-[250px] h-[250px]'
                    />
                </div>
                <div className='flex flex-col gap-4 items-start justify-center'>
                    <p className='font-bold text-xl'>{course?.courseName}</p>
                    <p className='text-sm'>{course?.courseDescription}</p>
                    <p className='text-xs text-gray-400'>{course?.createdAt}</p>
                    <div className='text-yellow-25 mt-2'>
                        {course?.status === 'Published' && (
                            <div className='gap-2 flex px-2 text-sm justify-center items-center rounded-3xl border border-richblack-400 bg-richblack-500 py-1'>
                                <div className='flex items-center justify-center rounded-full w-[15px] h-[15px] bg-yellow-50'>
                                    <FaCheck className="font-bold text-richblack-900" />
                                </div>
                                <p>Published</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex gap-6 items-center justify-center'>
                <p className='text-sm'>{formattedTime}</p>
                <p className='text-lg font-bold'>₹{course?.price}</p>
                <div className='flex gap-4'>
                    <button onClick={editHandler}>
                        <MdEdit className='cursor-pointer text-2xl hover:text-caribbeangreen-200 hover:scale-110' />
                    </button>
                    <button onClick={deleteHandler}>
                        <MdDelete className='cursor-pointer text-2xl hover:text-pink-200 hover:scale-110' />
                    </button>
                </div>
            </div>
            {showModal && (
                <ConformationModal
                    modalData={modalData}
                />
            )}
        </div>
    );
}

export default Course;
