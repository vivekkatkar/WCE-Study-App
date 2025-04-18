
import Template from './Template';
import signupimg from '../../assets/Images/signup.webp'
function Signup({setIsLoggedIn}) {
  return (
    <Template  formtype="signup"  setIsLoggedIn = {setIsLoggedIn}
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupimg}
    ></Template>
  );
}

export default Signup;


