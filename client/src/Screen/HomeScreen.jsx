import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import Promos from '../Components/Home/Promos'
import TopRate from '../Components/Home/TopRate'
import { useDispatch, useSelector } from 'react-redux'
import { getRandomMoviesAction, getTopRateMoviesAction} from '../Redux/Action/movieAction'
import toast from 'react-hot-toast'

const HomeScreen = () => {
 
  const dispatch = useDispatch();
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);
  const {
    isLoading: topRateLoading,
    isError:  topRateError,
    topRateMovies
  } = useSelector((state) => state.getTopRateMovies);

  useEffect(() => {
    dispatch(getRandomMoviesAction());
    dispatch(getTopRateMoviesAction());
  }, [dispatch]);

  useEffect(() => {
    if ( randomError) {
      dispatch({type:"GET_TOP_RATE_MOVIE_RESET"})
    }
    if (topRateError) {
      dispatch({type:"GET_RANDOM_MOVIE_RESET"})
    }
  }, [randomError,topRateError]);
  return (
    <Layout>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
        <Banner isLoading={randomLoading}  movies={randomMovies}></Banner>
        <PopularMovies isLoading={randomLoading}  movies={randomMovies} ></PopularMovies>
        <Promos></Promos>
        <TopRate isLoading={topRateLoading}  movies={topRateMovies} ></TopRate>
      </div>
    </Layout>
  )
}

export default HomeScreen