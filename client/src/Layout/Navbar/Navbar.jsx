import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate,  } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import {  useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate()
  const hover = "hover:text-subMain transition text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [userImage, setUserImage] = useState("");
  const [search, setSearch] = useState("");
  const { favoriteMovies } = useSelector((state) => state.getFavoriteMovies);
  useEffect(() => {
    if (userInfo && userInfo.image) {
      setUserImage(userInfo.image);
    }
  }, [userInfo,useDispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate(`/movies`);
    }
  };
  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          <div className="col-span-1 hidden lg:block">
            <Link to="/">
              <img
                src="/images/logo2.jpg"
                alt="logo"
                className="w-full h-12 object-contain"
              />
            </Link>
          </div>
          <div className="col-span-3">
            <form onSubmit={handleSearch} className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch />
              </button>
              <input
                placeholder="Search here"
                type="text"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
                onChange={(e)=> setSearch(e.target.value) }
              />
            </form>
          </div>
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={Hover}>
              Contact Us
            </NavLink>
            {userInfo && userInfo.fullName ? (
              <NavLink to="/profile" className={Hover}>
                <img
                  className="w-8 h-8 rounded-full border object-cover border-subMain"
                  src={userImage}
                  alt="anh chua"
                />
              </NavLink>
            ) : (
              <NavLink to="/login" className={Hover}>
                <CgUser className="w-full h-8" />
              </NavLink>
            )}

            <NavLink to="/favorite" className={`${Hover} relative`}>
              <FaHeart className="w-full h-6" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
