import { BiCart } from 'react-icons/bi';
import * as Icons from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLinks = ({ link, iconName ,onClose }) => {

    if(link.name !== 'Cart'){
        var Icon = Icons[iconName]; 
    }
   
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <NavLink 
          onClick={onClose}
            to={link.path}
            // onClick={}
            className={` text-richblack-200 relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800" : "  "}`}
        >
            <span className={` absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? " opacity-100" : "opacity-0"}`}>
            </span>
            
            <div className=' flex items-center gap-2 '>
                {
                    link.name !== 'Cart' ? <Icon className=" text-lg" />:  <BiCart className=' text-lg '/>
                }
                
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
}

export default SidebarLinks;
