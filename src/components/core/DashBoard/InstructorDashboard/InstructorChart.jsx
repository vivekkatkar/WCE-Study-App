import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
function InstructorChart({courses}) {
   const [active ,setActive ]= useState(false);
   const [data,setData] = useState([]);
   const [c,setC] = useState(courses);

   //active --> students
   function activeHandler(){
    setActive(!active)
   }


   useEffect(()=>{
     if(active)
     {
       //sort on basis of courses
       c.sort((a,b)=>b.totalStudentsEnrolled - a.totalStudentsEnrolled);
       setData(
        [
          {title:c[0]?.courseName,value:c[0]?.totalStudentsEnrolled,color: '#E38627'},
          {title:c[1]?.courseName,value:c[1]?.totalStudentsEnrolled,color: '#C13C37'},
          {title:c[2]?.courseName,value:c[2]?.totalStudentsEnrolled,color: '#6A2135'}
        ]
     )
     }
     else{
      c.sort((a,b)=>b.totalAmountGenrated - a.totalAmountGenrated);
      setData(
        [
          {title:c[0]?.courseName,value:c[0]?.totalAmountGenrated,color: '#E38627'},
          {title:c[1]?.courseName,value:c[1]?.totalAmountGenrated,color: '#C13C37'},
          {title:c[2]?.courseName,value:c[2]?.totalAmountGenrated,color: '#6A2135'}
        ]
     )
     }
    
   },[active])


  return (
    <div className=' my-4 flex flex-col gap-y-10 items-center justify-center  rounded-md  bg-richblack-800 px-4 py-6  '>

<div className=' flex gap-x-4 '>
  <button onClick={activeHandler} className={`text-yellow-100  font-semibold ${active ?" bg-yellow-300 rounded-md px-2 py-1" :""} `}>Students</button>
  <button onClick={activeHandler} className={`text-yellow-100  font-semibold ${!active ?" bg-yellow-300 rounded-md px-2 py-1" :""} `}>Income</button>
</div>
    <div className=' w-full flex items-center justify-center'>
       <PieChart
  data={data}
     />
     </div>



    </div> 
  )
}

export default InstructorChart
