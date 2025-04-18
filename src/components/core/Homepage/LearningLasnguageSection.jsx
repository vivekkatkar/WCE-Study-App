import HighlightedText from "./HighlightedText"
import  PlanYourProgress from '../../../assets/Images/Plan_your_lessons.svg'
import KnowYourProgress from '../../../assets/Images/Know_your_progress.svg'
import CompareEithOthers from '../../../assets/Images/Compare_with_others.svg'
import CTAButton from "./CTAButton"




const LearningLasnguageSection = () =>{
  return(
    <div className=" flex flex-col gap-4  mt-36   pb-9   ">
         <div className=" flex flex-col gap-2 justify-center items-center ">
               <h2 className=" text-4xl text-center font-semibold">Your swiss knife for  <HighlightedText>learning any Language</HighlightedText></h2>
               <p className=" text-center  text-richblack-300     w-[70%]">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
         </div>
         {/*Images   */}
         <div className=" flex flex-row  relative h-[520px] z-10 ">
                <img src= {KnowYourProgress} className=" absolute left-14 top-10"></img>
                <img src= {CompareEithOthers } className=" absolute left-[50%] -translate-x-[50%]"></img>
                <img src= {PlanYourProgress} className=" absolute   right-10"></img>
         </div>
         <div className=" self-center">
         <CTAButton   active={true} linkTo={"/signup"}> Learn More</CTAButton> 
         </div>
         
    </div>
  )
}
export default LearningLasnguageSection