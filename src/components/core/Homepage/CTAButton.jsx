import { Link } from "react-router-dom"

const CTAButton = ({children,active,linkTo})=>{
    return(
        <div className=" max-w-max">
          <Link to={linkTo}> 
          <div  className={` text-center text-[13px]  px-6 py-3 rounded font-bold text-lg
           ${active ? "bg-yellow-50   text-black" :"bg-richblack-800 text-white"}
          
           hover:scale-95 transition-all duration-200
          `}>
            {children}
            {console.log(children)}
          </div>
          </Link>
        </div>
    )
}

 export default CTAButton;

