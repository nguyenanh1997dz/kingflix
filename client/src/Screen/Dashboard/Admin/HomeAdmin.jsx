import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
const HomeAdmin = ({children}) => {
    const SideBarLinks = [
        { name: "Statistics", link: "/admin/statistics", icon: MdDashboard },
        { name: "Add Movie", link: "/admin/add", icon: RiMovie2Fill },
        { name: "List Movie", link: "/admin/list", icon: FaClipboardList },
        { name: "Categories", link: "/admin/categories", icon: TbCategoryFilled },
        { name: "Users", link: "/admin/users", icon: FaUsers },
      ];
      const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const Hover = ({ isActive }) => {
    return isActive ? `${active} ${inActive}` : `${inActive} ${hover} `;
  };
  return (
    <div className="bg-main text-white">
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-full h-12 object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-screen container mx-auto px-2">
      <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {SideBarLinks.map((link, index) => (
              <NavLink key={index} to={link.link} className={Hover}>
                <link.icon></link.icon>
                {link.name}
              </NavLink>
            ))}
          </div>
          <div 
          className="col-span-6 rounded-md bg-dry border border-gray-800 p-6 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeAdmin;
