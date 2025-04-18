import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import RatingStars from '../../common/RatingStrars'
import { apiConnector } from '../../../services/apiConnector';
import { useState } from 'react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

function ReviewSlider() {
    const [reviews,setReviews] = useState([]);
    const truncateWords = ()=>{
        
    }

    useEffect(()=>{
        const fetchAllReviews = async()=>{
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            const api =  BASE_URL + '/getReview'
            // console.log('API is HERE' ,api);
            
            const response =  await apiConnector('GET',api);
            const data = response.data;
            if(data?.success === true){
               setReviews(response.data.data)
            }
            
        }
        fetchAllReviews();
    },[]);
    
    return (
        <div className='text-white h-[300px] max-w-full'> {/* Adjust the height */}
            <div className='w-full'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={24}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index} className='flex flex-col items-center'> {/* Center content */}
                           <div className=' bg-richblack-800 px-2 py-4   lg:min-w-[400px] rounded-md '>
                            <div className=' flex items-center gap-x-2'>
                            <img 
                                src={review.user.image}
                                alt='userImage'
                                className='h-[50px] w-[50px] object-cover rounded-full' // Adjust the size
                            />
                             <p>{review.user.firstName} {review.user.lastName}</p>
                            </div>
                            <p>{review?.course?.courseName}</p>
                           
                            <p>
                                {review.review}
                            </p>
                            <div className=' flex gap-4'>
                            <p>{review.rating}</p>
                             <RatingStars Review_Count={review.rating}></RatingStars>
                             </div>
                             </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ReviewSlider
