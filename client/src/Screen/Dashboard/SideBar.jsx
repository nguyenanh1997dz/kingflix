import React from "react";
import Layout from "../../Layout/Layout";
import { FaUsers } from "react-icons/fa";
import { NavLink,useNavigate } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../Redux/Action/userAction";

const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const SideBarLinks = [
    { name: "Profile", link: "/profile", icon: FaUsers },
    { name: "Favorite Movie", link: "/favorite", icon: MdOutlineFavorite },
    { name: "Change Password", link: "/password", icon: FaLock },
  ];
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const Hover = ({ isActive }) => {
    return isActive ? `${active} ${inActive}` : `${inActive} ${hover} `;
  };
  const handleUserLogout = () => {
    dispatch(logOutAction())
    navigate('/')
  }
  return (
    <>
      <Layout>
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6 min-h-screen ">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {SideBarLinks.map((link, index) => (
              <NavLink key={index} to={link.link} className={Hover}>
                <link.icon></link.icon>
                {link.name}
              </NavLink>
            ))}
             <button onClick={handleUserLogout} className="rounded font-medium text-sm transitions flex gap-3 items-center p-4 hover:text-white hover:bg-main"><IoIosLogOut />Logout</button>
          </div>
          <div 
          className="col-span-6 rounded-md bg-dry border border-gray-800 p-6 ">
            {children}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SideBar;
