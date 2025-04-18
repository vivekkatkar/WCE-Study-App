import { Link, matchPath } from "react-router-dom";
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { GrCart } from "react-icons/gr";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { setToken } from "../../Reducer/slices/authslice";
import { BsChevronDown } from "react-icons/bs"; 
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { ACCOUNT_TYPE } from '../../utils/constants';

const NavBar = () => { 
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);  // State to handle mobile menu visibility
    const [catalogOpen, setCatalogOpen] = useState(false);  // State to handle Catalog sublinks visibility

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                console.log("Categories ", res.data.data);
                setSubLinks(res.data.data);
            } catch (error) {
                console.log("Could not fetch Categories.", error);
            }
            setLoading(false);
        })();
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div className={`flex z-[100] h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
            location.pathname !== "/" ? "bg-richblack-800  fixed left-0  right-0  z-10" : ""
        } transition-all duration-200`}>
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
                </Link>
                {/* Desktop Navigation links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-richblack-25">
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <>
                                        <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                            matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"
                                        }`}>
                                            <p>{link.title}</p>
                                            <BsChevronDown />
                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45  rounded bg-richblack-5"></div>
                                                {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                ) : subLinks && subLinks.length ? (
                                                    <>
                                                        {subLinks
                                                            ?.filter((subLink) => subLink?.courses?.length >= 0)
                                                            ?.map((subLink, i) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={i}>
                                                                    <p>{subLink.name}</p>
                                                                </Link>
                                                            ))}
                                                    </>
                                                ) : (
                                                    <p className="text-center">No Courses Found</p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Login / Signup / Dashboard */}
                <div className="hidden items-center gap-x-4 md:flex">
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/login">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Log in
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/signup">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Sign up
                            </button>
                        </Link>
                    )}
                    {token !== null && <ProfileDropDown />}
                </div>
                <button className="mr-4 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
            </div>
            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full  backdrop-blur-md  bg-opacity-70 bg-richblack-800 z-50 p-4">
                    <div className="flex justify-end">
                        <button onClick={() => setMenuOpen(false)} className="text-richblack-100">
                            Close
                        </button>
                    </div>
                    <ul className="flex flex-col gap-y-4 mt-6 text-richblack-25">
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className="text-lg">
                                {link.title === "Catalog" ? (
                                    <>
                                        <div
                                            className="flex items-center justify-between cursor-pointer"
                                            onClick={() => setCatalogOpen(!catalogOpen)}
                                        >
                                            <p>{link.title}</p>
                                            <BsChevronDown
                                                className={`transform transition-transform ${
                                                    catalogOpen ? "rotate-180" : ""
                                                }`}
                                            />
                                        </div>
                                        {catalogOpen && (
                                            <div className="pl-4 mt-2">
                                                {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                ) : subLinks && subLinks.length ? (
                                                    subLinks
                                                        ?.filter((subLink) => subLink?.courses?.length >= 0)
                                                        ?.map((subLink, i) => (
                                                            <Link
                                                                to={`/catalog/${subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`}
                                                                className="block rounded-lg bg-transparent py-2 pl-4 hover:bg-richblack-50"
                                                                key={i}
                                                                onClick={() => {
                                                                    setMenuOpen(false);
                                                                    setCatalogOpen(false);
                                                                }}
                                                            >
                                                                <p>{subLink.name}</p>
                                                            </Link>
                                                        ))
                                                ) : (
                                                    <p className="text-center">No Courses Found</p>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={link?.path}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                        {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <li className="text-lg">
                                <Link to="/dashboard/cart" onClick={() => setMenuOpen(false)}>
                                    Cart
                                </Link>
                            </li>
                        )}
                        {token === null && (
                            <>
                                <li>
                                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                                        <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                            Log in
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                        <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                            Sign up
                                        </button>
                                    </Link>
                                </li>
                            </>
                        )}
                        {token !== null && (
                            <li>
                                <ProfileDropDown />
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;
