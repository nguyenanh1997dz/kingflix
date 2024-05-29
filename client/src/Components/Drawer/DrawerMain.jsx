
import React from 'react';
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import { Link, NavLink } from 'react-router-dom';

const DrawerMain = ({ isOpen, onClose }) => {
  const inActive =
  "rounded sm:gap-10 font-medium text-sm transitions flex gap-6 items-center sm:px-8 px-4 py-4 items-center";
const active = "bg-dry text-subMain";
const hover = " hover:bg-dry";
const Hover = ({ isActive }) => {
  console.log(isActive);
  return isActive ? `${active} ${inActive}` : `${inActive} ${hover} `;
};
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      handler={false}
      level={null}
      placement="left"
      width="100%"
      handlerStyle={{ display: 'none' }}
      className="transitions"
    >
     <div className='flex flex-col w-full h-full justify-between items-center bg-main text-white rounded'>
      <div className="w-full flex-btn h-16 px-6 py-4 bg-dry">
        <Link to="/">
          <img src="/images/logo.png" alt="logo" className='w-28 h-28 object-contain' />
        </Link>
        <button  onClick={onClose} className=" transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white ">X</button>
      </div>
      <div className="w-full overflow-y-scroll flex-grow max-height-full">
        <div className="pb-12 pt-4">
          <NavLink to="/movies" className={Hover}>Movie</NavLink>
          <NavLink to="/contact" className={Hover}>Contact</NavLink>
          <NavLink to="/about-us" className={Hover}>About</NavLink>
        </div>
      </div>
     </div>
    </Drawer>
  );
};

export default DrawerMain;
