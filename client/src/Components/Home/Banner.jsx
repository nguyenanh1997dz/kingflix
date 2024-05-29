import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import FlexMovieItem from "../FlexMovieItem";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { likeMovieFunc } from "../../Context/likeMoviesFunction";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "../Empty";

const Banner = ({ movies, isLoading }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48";
  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className={sameClass}>
          <Loader></Loader>
        </div>
      ) : movies ? (
        <Swiper
          direction="vertical"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={1000}
          modules={[Autoplay]}
          className="w-full xl:h-96 bg-dry lg:h-64 h-48"
        >
          {movies?.slice(0, 3).map((movie, index) => (
            <SwiperSlide
              key={index}
              className="relative rounded overflow-hidden"
            >
              <img
                src={movie?.image}
                alt="banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
                <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
                  {movie?.name}
                </h1>
                <div className="flex gap-5 items-center text-dryGray">
                  <FlexMovieItem movie={movie}></FlexMovieItem>
                </div>
                <div className="flex gap-5 items-center">
                  <Link
                    className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
                    to={`/movie/${movie?._id}`}
                  >
                    Watch
                  </Link>
                  <button onClick={() => likeMovieFunc(movie?._id,userInfo,dispatch)}  className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30">
                    <FaRegHeart />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Empty message="No movies"></Empty>
      )}
    </div>
  );
};

export default Banner;
