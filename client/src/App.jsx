import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen";
import AboutUs from "./Screen/AboutUs";
import NotFound from "./Screen/NotFound";
import Contact from "./Screen/Contact";
import Movies from "./Screen/Movies";
import Login from "./Screen/Login";
import SingleMovie from "./Screen/SingleMovie";
import WatchMovie from "./Screen/WatchMovie";
import Register from "./Screen/Register";
import Profile from "./Screen/Dashboard/Profile";
import FavoriteMovie from "./Screen/Dashboard/FavoriteMovie";
import Password from "./Screen/Dashboard/Password";
import Dashboard from "./Screen/Dashboard/Admin/Dashboard";
import ScrollOnTop from "./Components/ScrollOnTop";
import ToastContainer from "./Components/ToastContainer";
import { AdminProtectionRouter, ProtectionRouter, IsLogin } from "./ProtectionRouter";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMoviesAction } from "./Redux/Action/userAction";

function App() {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.getFavoriteMovies);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      dispatch(getFavoriteMoviesAction());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (isError) {
      dispatch({ type: "GET_FAVORITE_MOVIES_RESET" });
    }
  }, [dispatch, isError ]);

  return (
    <ScrollOnTop>
      <ToastContainer />
      <Routes>
        {/*Public Router */}
        <Route path="/" element={<HomeScreen />} />
        <Route element={<IsLogin/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:search" element={<Movies />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
        <Route path="*" element={<NotFound />} />
        {/*Private Router */}
        <Route element={<ProtectionRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<Password />} />
          <Route path="/favorite" element={<FavoriteMovie />} />
        </Route>
        {/*Admin router */}
        <Route element={<AdminProtectionRouter />}>
          <Route path="/admin/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </ScrollOnTop>
  );
}

export default App;
