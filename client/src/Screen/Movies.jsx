import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filter from "../Components/Filter";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../Redux/Action/movieAction";
import {
  YearData,
  LanguageData,
  RatesData,
  TimesData,
} from "../Components/Data/FilterData";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { RiMovie2Line } from "react-icons/ri";


const Movies = () => {
  const { search } = useParams();
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const [page, setPage] = useState(1);
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?._id,
      time: times?.title.replace(/\D/g, ""),
      language: language?.title === "Sort By Language" ? "" : language?.title,
      rate: rates?.title.replace(/\D/g, ""),
      year: year?.title.replace(/\D/g, ""),
      search: search || "",
      page: page ? page : 1 ,
    };
    return query;
  }, [category, times, language, rates, year, search,page]);

  const datas = {
    category,
    setCategory,
    language,
    setLanguage,
    rates,
    setRates,
    times,
    setTimes,
    year,
    setYear,
  };
  useEffect(() => {
    setPage(1); 
  }, [category, year, times, rates, language, search]);

  const dispatch = useDispatch();
  const { isError, isLoading, error, allMovies, moviesCount,totalPage } = useSelector(
    (state) => state.getAllMovies
  );
  useEffect(() => {
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, queries]);

  useEffect(() => {
    if (isError) {
      dispatch({ type: "GET_ALL_MOVIES_RESET" });
    }
  }, [isError, dispatch]);
 
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filter data={datas} />
        <div className="text-lg font-medium my-6">
          Total {moviesCount || 0} Movies
        </div>
        {isLoading ? (
          <Loader></Loader>
        ) : allMovies ? (
          <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {allMovies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="w-full gap  -6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
            <RiMovie2Line />
            </div>
            <p className="text-border text-sm">No movies found</p>
          </div>
        )}
        <div className="w-full flex-colo md:my-20 my-10">
          <Pagination setPage={setPage} totalPage={totalPage}></Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default Movies;
