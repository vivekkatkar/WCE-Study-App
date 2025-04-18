import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories, getCatalogPageData } from '../services/api';
import { useEffect } from 'react';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
function Catalog() {
    
    const {catalogName} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const[categoryId,setCategoryId] = useState('');
    const [loading,setLoading] = useState(false);

    // Fetch All Categories
    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            // console.log("Categories In Catalog ",res.data.data);
            const cId = res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(cId);
           
          } catch (error) {
            console.log("Could not fetch Categories.", error)
          }
          setLoading(false)
        })
        ()
      }, [catalogName]);

      console.log("Catalog Name " , catalogName ," categoryId ",categoryId);
    
      useEffect(()=>{
          const getCategoryDetails = async()=>{
            try{
                if(!categoryId)
                {
                    return;
                }
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
                console.log("Result ::: ",res);

            }
            catch(e)
            {
               
                console.log("Error IngetCategoryDetials" ,e);
            }
           

          }

          getCategoryDetails();
      },[categoryId]);


  return (
    <div className=' text-white mt-14'>
        <div className=' bg-richblack-800 py-20  '>
            <div className='max-w-[1300px] mx-auto flex flex-col gap-6'>
            <p className=' text-richblack-300'>{`Home /Catlog / `}
                 <span className=' text-yellow-50'>
                    {catalogPageData?.data?.selectedCategory?.name}
                 </span>
            </p>
            <p className=' text-3xl '><span>
                    {catalogPageData?.data?.selectedCategory?.name}
                 </span></p>
            <p className=' text-richblack-400'><span>
                    {catalogPageData?.data?.selectedCategory?.description}
                 </span></p>
            </div>
            
        </div>

        <div>
            {/* Section 1 */}
            <div className=' pt-10 '>
                <div className=' ml-14 text-4xl  font-semibold'>Courses To Get You Started </div>
                <div className=' flex gap-4 ml-14  pt-6 pb-4'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <div className=' border-t border-richblack-600'></div>

                {/* CourseSlider */}

                <div className=' pt-6 max-w-[1400px] mx-auto  '>
                    <CourseSlider Courses = {catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>

            {/* Section 2 */}

            <div className=' pt-6 max-w-[1400px] mx-auto  mt-10 '>
                <p className=' text-4xl  font-semibold'>Top Courses in  <span>
                    {catalogPageData?.data?.selectedCategory?.name}
                 </span> </p>
                <div>
                    <CourseSlider Courses ={catalogPageData?.data?.differentCategory.courses
} />
                </div>
            </div>

            {/* Section 3 */}

            <div className='max-w-[1400px] mx-auto  mt-10'>
                <p className='   text-4xl font-semibold ' >Frequently Bought </p>
                {/* MostSeller */}
                <div className='py-8 lg:max-w-[1400px]  mx-auto '>
                   <div
                    className=' grid grid-cols-1 lg:grid-cols-2 gap-6'
                   >
                    {
                        catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>(
                            <Course_Card  course={course} key={index}  Height={'h-[400px]'}></Course_Card>
                        ))
                    }
                   </div>
                </div>
            </div>
        </div>

        {/* Footer */}
    </div>
  )
}

export default Catalog
