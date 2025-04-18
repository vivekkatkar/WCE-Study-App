import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../Reducer/slices/courseslice';
import IconBtn from '../../../../common/IconButton';
import { useForm } from 'react-hook-form';
import { updateCourseStatus } from '../../../../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function PublishCourse() {
    
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();
    useEffect(()=>{
        // Set draft
    },[]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goBack = () => {
        dispatch(setStep(2));
    }

    const { course } = useSelector((state) => state.course);
    // const { token } = useSelector((state) => state.auth);
    // console.log("Token.... ",token);
    console.log("publish Course ",course );

    const onSubmit = async (data) => {
        let result;
        if (data.draft === false) {
            result = await updateCourseStatus({
                status: 'Draft',
                courseId: course._id
            });
        } else {
            result = await updateCourseStatus({
                status: 'Published',
                courseId: course._id
            });
        }

        if (result) {
            toast.success("Status Updated Successfully");
            dispatch(setCourse(null));
            dispatch(setStep(1));
            dispatch(setEditCourse(false));
            navigate('/dashboard/my-courses');
            
        } else {
            toast.error("Failed to update status");
        }

        // console.log("status");
    }

    return (
        <div className='text-white flex items-center justify-center lg:w-[600px] lg:h-[200px]'>
            <div className='w-full h-full flex flex-col gap-2 bg-richblack-800 px-2 py-4 rounded-md border border-richblack-200'>
                <h1 className='text-2xl'>Publish Settings</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-2 items-center'>
                        <input
                            id='draft'
                            name='draft'
                            {...register('draft')}
                            type='checkbox'
                            className='bg-richblack-600 custom-checkbox'
                        />
                        <label htmlFor='draft' className='text-richblack-400 text-lg'>Make this Course as Public</label>
                    </div>
                    <div className='flex gap-4 self-end'>
                        <button className='px-2 py-1 bg-richblack-400 rounded-md' onClick={goBack}>
                            Back
                        </button>
                        <button type='submit'>
                            <IconBtn text={'Save Changes'} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PublishCourse;
