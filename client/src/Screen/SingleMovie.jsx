import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import MovieInfo from "../Components/SingleMovie/MovieInfo";
import MovieCast from "../Components/SingleMovie/MovieCast";
import MovieReview from "../Components/SingleMovie/MovieReview";
import MovieRelated from "../Components/SingleMovie/MovieRelated";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsMovieAction } from "../Redux/Action/movieAction";
import Loader from "../Components/Loader";
import { RiMovie2Line } from "react-icons/ri";

const SingleMovie = () => {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getDetailsMovie
  );
  const { allMovies } = useSelector((state) => state.getAllMovies);
  const relatedMovie = allMovies?.filter((m) => m.category._id === movie?.category);
const updateReview = () => {
  dispatch(getDetailsMovieAction(id));
}
  useEffect(() => {
    dispatch(getDetailsMovieAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : movie && (
        <>
          <MovieInfo movie={movie} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCast cast={movie.casts} />
            <MovieReview updateMovie={updateReview} movie={movie} />
            <MovieRelated movies={relatedMovie}/>
          </div>
        </>
      ) }
    </Layout>
  );
};

export default SingleMovie;
