import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../components/core/DashBoard/SideBar";
import MobileSidebar from "../components/core/DashBoard/MobileSidebar";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    if (profileLoading || authLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)] mt-14">
            <div className="hidden sm:block"> {/* Hidden on small screens, visible on medium and larger */}
                <SideBar />
            </div>
            <div>
                <button 
                    className="sm:hidden text-white"
                    onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                >
                    Menu <MdDashboard/>
                </button>
            </div>
            {/* Mobile Sidebar */}
            {isMobileSidebarOpen && (
                <div className="sm:hidden fixed inset-0 bg-richblack-800 p-4 z-50">
                    <MobileSidebar onClose={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
                </div>
            )}
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
