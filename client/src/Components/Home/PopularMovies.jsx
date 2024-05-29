import React from "react";
import { BsCollectionFill } from "react-icons/bs";
import Title from "../Title";
import Movie from "../Movie";
import Loader from "../Loader";
import { Empty } from "../Empty";



const PopularMovies = ({ isLoading, movies }) => {
  const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48";
  return (
    <div className="my-16">
      <Title title="Populate Film" Icon={BsCollectionFill}></Title>
      {isLoading ? (
        <div className={sameClass}>
          <Loader></Loader>
        </div>
      ) : (
          movies ? (
            <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies?.map((movie, index) => (
            <Movie key={index} movie={movie}></Movie>
          ))}
        </div>
          ) : (
            <Empty message="No Movies"></Empty>
          )
      )}
    </div>
  );
};

export default PopularMovies;
