import * as movieContants from "../Constants/movieContants";
const getAllMoviesReducre = (state = {}, action) => {
  switch (action.type) {
    case movieContants.GET_ALL_MOVIES_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case movieContants.GET_ALL_MOVIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        allMovies: action.payload.movies,
        totalPage: action.payload.totalPage,
        page: action.payload.currentPage,
        moviesCount: action.payload.moviesCount,
      };
    case movieContants.GET_ALL_MOVIES_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case movieContants.GET_ALL_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};
const getDetailsMovieReducre = (state = {}, action) => {
  switch (action.type) {
    case movieContants.GET_DETAILS_MOVIE_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case movieContants.GET_DETAILS_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        movie: action.payload,
      };
    case movieContants.GET_DETAILS_MOVIE_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case movieContants.GET_DETAILS_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
const getRandomMoviesReducre = (state = {}, action) => {
  switch (action.type) {
    case movieContants.GET_RANDOM_MOVIE_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case movieContants.GET_RANDOM_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        movies: action.payload,
      };
    case movieContants.GET_RANDOM_MOVIE_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case movieContants.GET_RANDOM_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
const getTopRateMoviesReducre = (state = {}, action) => {
  switch (action.type) {
    case movieContants.GET_TOP_RATE_MOVIE_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case movieContants.GET_TOP_RATE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        topRateMovies: action.payload,
      };
    case movieContants.GET_TOP_RATE_MOVIE_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case movieContants.GET_TOP_RATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
const createMovieReducre = (state = {}, action) => {
  switch (action.type) {
    case movieContants.CREATE_MOVIE_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case movieContants.CREATE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        movie: action.payload,
      };
    case movieContants.CREATE_MOVIE_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case movieContants.CREATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
export {
    getAllMoviesReducre,
    getDetailsMovieReducre,
    getRandomMoviesReducre,
    getTopRateMoviesReducre,
    createMovieReducre
};
