import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Title from "../Title";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import Loader from "../Loader";
import { Empty } from "../Empty";
import { likeMovieFunc } from "../../Context/likeMoviesFunction";
import { useDispatch, useSelector } from "react-redux";


const TopRate = ({ isLoading, movies }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin);
  const swiperRef = useRef();
  const className =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48";
  return (
    <div className="my-16">
      <Title title="Top rate" Icon={BsBookmarkStarFill}></Title>

      {isLoading ? (
        <div className={sameClass}>
          <Loader></Loader>
        </div>
      ) : movies ? (
        <div className="mt-10">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={4}
            loop={true}
            autoplay={true}
            speed={1000}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {movies?.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
                  <img
                    src={movie?.image}
                    alt="movies"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
                    <button onClick={() => likeMovieFunc(movie?._id,userInfo,dispatch)} className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                      <FaHeart />
                    </button>
                    <Link
                      to={`/movie/${movie._id}`}
                      className="font-semibold text-xl trancuted line-clamp-2"
                    >
                      {movie.name}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full px-1 flex-rows gap-6 pt-12">
            <button
              className={className}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <BsCaretLeftFill></BsCaretLeftFill>
            </button>
            <button
              className={className}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <BsCaretRightFill></BsCaretRightFill>
            </button>
          </div>
        </div>
      ) : (
        <Empty></Empty>
      )}
    </div>
  );
};

export default TopRate;
