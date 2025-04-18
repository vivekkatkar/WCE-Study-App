import Template from './Template';
import logininmage from  '../../assets/Images/login.webp'
const Login = ({isLoggendIn,setIsLoggedIn})=>{


  return(
    <div className=" flex flex-col justify-center items-center ">
          <Template  isLoggendIn ={isLoggendIn} setIsLoggedIn={setIsLoggedIn} desc1="Build skills for today, tomorrow, and beyond."
     desc2="Education to future-proof your career." image ={logininmage} title="Welcome Back "
     
    ></Template>
    
    </div>
    
  )
}

export default Login;

