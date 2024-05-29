import React from "react";
import Title from "../Title";
import { BsFillPeopleFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const MovieCast = ({cast}) => {
  return (
    <>
      <div className="my-12">
        <Title title="Cast" Icon={BsFillPeopleFill}></Title>
      </div>
      <div className="mt-10">
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          loop={true}
          autoplay={true}
          speed={1000}
          modules={[Autoplay, Navigation]}
        >
          {cast.map((cast) => (
            <SwiperSlide key={cast?._id}>
              <div className="w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800">
                <img
                  src={cast?.img}
                  alt="cast"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p>{cast?.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MovieCast;
