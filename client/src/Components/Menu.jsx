// Menu.js
import React from "react";
import { TiThMenu } from "react-icons/ti";

const Menu = ({ onDrawerButtonClick }) => {
  return (
    <button
      onClick={onDrawerButtonClick}
      className="transitions text-2xl flex-colo text-white rounded-md px-4 py-3"
    >
      <TiThMenu />
    </button>
  );
};

export default Menu;
