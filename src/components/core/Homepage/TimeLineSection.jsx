
import  logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import  logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import  logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import  logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'
const TimeLineSection = () => {

 const timeLine = [
    {
        Logo:logo1,
        heading:"Leadership",
        subheading:"Fully committed to the success company"
    },
    {
        Logo:logo2,
        heading:"Responsibility",
        subheading:"Students will always be our top priority"
    },
    {
        Logo:logo3,
        heading:"Flexibility",
        subheading:"The ability to switch is an important skills"
    },
    {
        Logo:logo4,
        heading:"Solve the problem",
        subheading:"Code your way to a solution"
    }
    

 ]
    return(
        <div>
            <div className=" flex gap-4 items-center  justify-between  ">
              <div className=" flex flex-col gap-7 w-[45%] "> 
                     
                     {
                        timeLine.map((element,index)=>{
                         return(
                            <div className=' flex flex-col'> 
                            <div className=' flex gap-6' key={index}>
                             <div className=' rounded-full h-[50px] w-[50px] bg-white flex justify-center items-center'> 
                              <img src={element.Logo }></img>
                              </div>

                              <div>
                                 <p className=' font-semibold text-[18px] '>{element.heading}</p>
                                 <p className=' text-base '>{element.subheading}</p>
                              </div>
                          {
                            //  index< timeLine.length-1 ? <div class="border-black border-dotted border-gray-500 mx-4 my-8"> -- </div>
                          }
                              
                         </div>
                         </div>
                         )
                         
                        })
                     }
              </div>
              <div className=' relative   shadow shadow-blue-200   '>
                  
               <img src={TimelineImage} className=' shadow shadow-white object-cover h-fit'></img>

              <div className='  absolute  left-[50%] -translate-x-[50%]   -translate-y-[50%]  bg-caribbeangreen-700 flex text-white uppercase px-6  py-3 '>
                 <div className=' flex gap-4 items-center  border-r border-caribbeangreen-200 px-7 '>
                    <h1 className=' text-3xl font-bold'>10</h1>
                    <h2 className=' text-caribbeangreen-300 text-sm'>Years of Experience </h2>
                 </div>
                 <div className=' flex items-center p-6  text-white uppercase gap-2 px-7 '>
                 <h1 className=' text-3xl font-bold'>250 </h1>
                    <h2 className=' text-caribbeangreen-300 text-sm'> Types Of Courses </h2>
                 </div>
                </div> 
              </div>

            </div>
        </div>
    )
}
export default TimeLineSection;


