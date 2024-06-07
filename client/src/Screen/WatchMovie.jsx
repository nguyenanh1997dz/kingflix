import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

import { FaHeart } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsMovieAction } from "../Redux/Action/movieAction";
import Loader from "../Components/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { likeMovieFunc } from "../Context/likeMoviesFunction";


const WatchMovie = () => {

  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [play, setPlay] = useState(false);
  const playMovie = () => {
    setPlay(true);
  };
  let { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getDetailsMovie
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    dispatch(getDetailsMovieAction(id));
  }, [dispatch, id]);
  return (
    <>
      <Layout>
        <div className="container mx-auto bg-dry p-6 mb-12">
          {!isError && (
            <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
              <Link
                to={`/movie/${movie?._id}`}
                className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
              >
                <BiArrowBack /> {movie?.name}
              </Link>
              <div className="flex-btn sm:w-auto w-full gap-5">
                <button
                  type="button"
                  onClick={() => likeMovieFunc(movie?._id,userInfo,dispatch)}
                  className={`bg-white hover:text-subMain text-white transitions bg-opacity-30 rounded px-4 py-3 text-sm`}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          )}
          {play ? (
            <video controls autoPlay={play} className="w-full h-full rounded">
              <source src={movie?.video} type="video/mp4" title="movie" />
            </video>
          ) : isLoading ? (
            <div className={sameClass}>
              <Loader></Loader>
            </div>
          ) : isError ? (
            <div className={sameClass}>
              <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-main text-subMain text-4xl">
                <RiMovie2Line />
              </div>
              <p className="text-border text-sm">Something went wrong. Please try again</p>
            </div>
          ) : (
            <>
              <div className="w-full h-screen rounded-lg overflow-hidden relative">
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={playMovie}
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button> 
                </div>
                <img
                  src={movie?.image}
                  alt="movie"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default WatchMovie;
