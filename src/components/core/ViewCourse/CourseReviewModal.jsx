import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import IconBtn from '../../common/IconButton';
import { createRating } from '../../../services/api';

function CourseReviewModal({ reviewModal, setReviewModal }) {
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setValue('courseExperience', '');
    setValue('courseRating', 0);
  }, [reviewModal, setValue]);

  const onSubmit = async (data) => {
    await createRating({
      courseId: courseEntireData._id,
      token,
      rating: data.courseRating,
      review: data.courseExperience,
    });
    setReviewModal(false);
  };

  const ratingChanged = (newRating) => {
    setValue('courseRating', newRating);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md'>
      <div className='text-white bg-richblack-800 border border-richblack-400 rounded-md p-4 w-full max-w-lg lg:w-[400px] lg:h-[400px]  bg-opacity-70 flex flex-col gap-2'>
        {/* Modal Header */}
        <div className='flex justify-between items-center'>
          <p className='text-2xl'>Add Review</p>
          <button onClick={() => setReviewModal(false)}>X</button>
        </div>

        <div className='flex items-center gap-2'>
          <img
            src={user?.image}
            alt='user'
            className='aspect-square w-[50px] h-[50px] rounded-full object-cover'
          />
          <div>
            <p>{user.firstName} {user.lastName}</p>
            <p>Posting Publicly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <ReactStars
            count={5}
            size={24}
            color2={'#ffd700'}
            onChange={ratingChanged}
          />

          <div>
            <label htmlFor='courseExperience'>Add Your Experience</label>
            <textarea
              id='courseExperience'
              {...register('courseExperience', { required: true })}
              placeholder='Add Your Experience of Course'
              className='form-style min-h-[130px] w-full bg-richblack-600 border-b-richblack-50 rounded-md border-b'
            />
            {errors.courseExperience && <span>Please Add Your Experience!!</span>}
          </div>

          <div className='flex gap-2'>
            <button
              type='button'
              onClick={() => setReviewModal(false)}
            >
              Cancel
            </button>
            <button
              type='submit'
            >
              <IconBtn text={"Save"} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseReviewModal;
