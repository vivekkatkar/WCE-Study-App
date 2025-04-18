import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Course_Card from './Course_Card';

function CourseSlider({ Courses }) {

    console.log("Courses ",Courses)
    return (
        <div className='text-white'>
            {
                Courses?.length === 0 ? (
                    <p>No Courses Found</p>
                ) : (
                    <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    modules={[FreeMode, Pagination]}
                    breakpoints={{
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    className="max-h-[30rem]"
                    >
                        {
                            Courses?.map((course, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Course_Card Height={'h-[500px]'} course={course} />
                                    </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                )
            }
        </div>
    );
}

export default CourseSlider;
