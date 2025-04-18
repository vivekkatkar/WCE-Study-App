import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStrars'
import GetAvgRating from '../../../utils/avgRating';
function Course_Card({course,Height}) {

  //  console.log(" course is Here --- /// 000 ", course);
   
   const [avgReviewCount,setAvgReviewCount] = useState(0);
   useEffect(()=>{

    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count)
   },[course])
    return (
    <div>
       <Link to={`/courses/${course._id}`}>
       
         <div>

            <div>
                <img
                alt='course Thumbnail'
                className={`${Height}  w-full  rounded-xl  lg:object-cover sm:object-contain`}
                 src={course.tumbnail}
                />
            </div>
            <div>
                <p className=' text-lg py-2'>{course?.courseName}</p>
                <p>{course?.instructor?.firstName || course?.instructor?.firstName  } {course?.instructor?.lastName || course?.instructor?.lastName  }</p>
                <div className=' flex gap-x-2 '>
                    <span  className=' text-yellow-400'>{avgReviewCount}</span>
                    <RatingStars
                     Review_Count={avgReviewCount}
                     
                    />
                    <span className=' text-richblack-500'>{course?.ratingAndReviews?.length} Ratings</span>
                </div>
                <p className=' text-md py-2'>Rs.{course?.price}</p>
            </div>
         </div>
       </Link>
    </div>
  )
}

export default Course_Card
