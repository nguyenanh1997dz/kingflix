import * as userConstants from "../Constants/userContants";
const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        userInfo: action.payload,
      };
    case userConstants.USER_LOGIN_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
      case userConstants.USER_LOGOUT:
      return {};
    case userConstants.USER_LOGIN_RESET:
      return {};
    default:
      return state;
  }
};
const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case userConstants.USER_REGISTER_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        userInfo: action.payload,
        error: null,
      };
    case userConstants.USER_REGISTER_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case userConstants.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
const updateUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_PROFILE_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        userUpdateProfile: action.payload,
      };
    case userConstants.USER_UPDATE_PROFILE_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case userConstants.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_CHANGE_PASSWORD_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        userChangePassword: action.payload,
      };
    case userConstants.USER_CHANGE_PASSWORD_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case userConstants.USER_CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
const getFavoriteMoviesReducer = (state = {favoriteMovies: []}, action) => {
  switch (action.type) {
    case userConstants.GET_FAVORITE_MOVIES_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case userConstants.GET_FAVORITE_MOVIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        favoriteMovies: action.payload,
      };
    case userConstants.GET_FAVORITE_MOVIES_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case userConstants.GET_FAVORITE_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};
const deleteFavoriteMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.DELETE_FAVORITE_MOVIES_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case userConstants.DELETE_FAVORITE_MOVIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    case userConstants.DELETE_FAVORITE_MOVIES_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case userConstants.DELETE_FAVORITE_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};
const reviewMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REVIEW_MOVIE_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case userConstants.REVIEW_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    case userConstants.REVIEW_MOVIE_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case userConstants.REVIEW_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
const likeMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.LIKE_MOVIE_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case userConstants.LIKE_MOVIE_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    case userConstants.LIKE_MOVIE_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case userConstants.LIKE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
export { userLoginReducer ,userRegisterReducer ,updateUserProfileReducer ,userChangePasswordReducer,getFavoriteMoviesReducer ,deleteFavoriteMoviesReducer,reviewMovieReducer,likeMovieReducer};
