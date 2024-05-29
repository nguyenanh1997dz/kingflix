// FooterM.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuMonitorPlay } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import DrawerMain from "../../Components/Drawer/DrawerMain";
import Menu from "../../Components/Menu";

const FooterM = () => {
  const inActive =
    " text-main  text-white rounded-md px-4 py-3 transitions text-2xl flex-colo";
  const active = " bg-subMain hover:bg-white hover:text-main";
  const Hover = ({ isActive }) => {
    return isActive ? `${active} ${inActive}` : `${inActive}`;
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawerButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div>
          <DrawerMain onClose={toggleDrawerButton} isOpen={isOpen}></DrawerMain>
        </div>
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink to="/" className={Hover}>
            <LuMonitorPlay className="w-full h-6" />
          </NavLink>
          <NavLink to="/favorite" className={Hover}>
            <div className="relative">
              <FaHeart className="w-full h-6" />
            </div>
          </NavLink>
          <NavLink to="/login" className={Hover}>
            <FaUserCheck />
          </NavLink>
          <Menu onDrawerButtonClick={toggleDrawerButton} />
        </div>
      </footer>
    </>
  );
};

export default FooterM;
