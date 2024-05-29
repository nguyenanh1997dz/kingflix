import {
  allMoviesService,
  getMovieByIdService,
  getRandomMoviesService,
  getTopRateMoviesService,
  createMovieService
} from "../API/movieService";
import * as movieConstants from "../Constants/movieContants";
import { ErrorAction } from "../Protection";

const getAllMoviesAction = (data) => async (dispatch) => {
  dispatch({ type: movieConstants.GET_ALL_MOVIES_REQUEST });
  try {
    const movies = await allMoviesService(data);
    dispatch({ type: movieConstants.GET_ALL_MOVIES_SUCCESS, payload: movies });
  } catch (error) {
    ErrorAction(error, movieConstants.GET_ALL_MOVIES_FAILURE, dispatch);
  }
};
const getDetailsMovieAction = (id) => async (dispatch) => {
  dispatch({ type: movieConstants.GET_DETAILS_MOVIE_REQUEST });
  try {
    const movie = await getMovieByIdService(id);
    dispatch({
      type: movieConstants.GET_DETAILS_MOVIE_SUCCESS,
      payload: movie,
    });
  } catch (error) {
    ErrorAction(error, movieConstants.GET_DETAILS_MOVIE_FAILURE, dispatch);
  }
};
const getRandomMoviesAction = () => async (dispatch) => {
  dispatch({ type: movieConstants.GET_RANDOM_MOVIE_REQUEST });
  try {
    const movies = await getRandomMoviesService();
    dispatch({
      type: movieConstants.GET_RANDOM_MOVIE_SUCCESS,
      payload: movies,
    });
  } catch (error) {
    ErrorAction(error, movieConstants.GET_RANDOM_MOVIE_FAILURE, dispatch);
  }
};
const getTopRateMoviesAction = () => async (dispatch) => {
  dispatch({ type: movieConstants.GET_TOP_RATE_MOVIE_REQUEST });
  try {
    const movies = await getTopRateMoviesService();
    dispatch({
      type: movieConstants.GET_TOP_RATE_MOVIE_SUCCESS,
      payload: movies,
    });
  } catch (error) {
    ErrorAction(error, movieConstants.GET_TOP_RATE_MOVIE_FAILURE, dispatch);
  }
};
const createMovieAction = (data) => async (dispatch) => {
  dispatch({ type: movieConstants.CREATE_MOVIE_REQUEST });
  try {
    const movie = await createMovieService(data);
    dispatch({
      type: movieConstants.CREATE_MOVIE_SUCCESS,
      payload: movie,
    });
  } catch (error) {
    ErrorAction(error, movieConstants.CREATE_MOVIE_FAILURE, dispatch);
  }
};
export { getAllMoviesAction, getDetailsMovieAction, getRandomMoviesAction,getTopRateMoviesAction,createMovieAction };
