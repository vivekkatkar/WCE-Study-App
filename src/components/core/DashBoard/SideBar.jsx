import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../../../data/dashboard-links';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import { useState } from 'react';
import ConformationModal from '../../common/ConformationModal';
import SidebarLinks from './SidebarLinks';
import { logout } from '../../../services/api';

const SideBar = ({ isMobile, onClose }) => { // isMobile and onClose props added
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [conformationModal, setConformationModal] = useState(null);
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    if (profileLoading || authLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <>
            <div className={`flex ${isMobile ? 'flex-col p-4' : 'h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'}`}>
                <div className="flex flex-col">
                    {sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null
                        return (
                            <SidebarLinks 
                                key={link.id} 
                                link={link} 
                                iconName={link.icon} 
                                onClick={isMobile ? onClose : undefined} // Close the sidebar on mobile after clicking a link
                            />
                        )
                    })}
                </div>
                <div className={`mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700 ${isMobile ? 'hidden' : ''}`} />
                <div className="flex flex-col">
                    <SidebarLinks
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                        onClick={isMobile ? onClose : undefined} // Close the sidebar on mobile after clicking a link
                    />
                    <button
                        onClick={() =>
                            setConformationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => {
                                    dispatch(logout(navigate));
                                    if (isMobile) onClose(); // Close the sidebar on mobile after logging out
                                },
                                btn2Handler: () => setConformationModal(null),
                            })
                        }
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {conformationModal && <ConformationModal modalData={conformationModal} />}
        </>
    )
};

export default SideBar;
