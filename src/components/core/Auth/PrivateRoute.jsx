import { Children } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const PrivateRoute = ({children}) =>{
    const navigate = useNavigate();
    const { token } = useSelector((state)=>state.auth)
    if(token !== null)
    return children;
else
return(
    <div>
          Please Login Broo.
          <button onClick={()=>navigate('/login')}> Login </button>
          
    </div>
)
}
export default PrivateRoute;