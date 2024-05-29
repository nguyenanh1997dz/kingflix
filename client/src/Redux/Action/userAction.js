import {
  loginService,
  registerService,
  logoutService,
  updateProfileService,
  changePasswordService,
  getFavoriteMoviesService,
  deleteFavoriteMoviesService,
  createReviewService,
  likeMovieService
} from "../API/userService";
import * as userConstants from "../Constants/userContants";
import { ErrorAction } from "../Protection";
import toast from "react-hot-toast";
const loginAction = (data) => async (dispatch) => {
  dispatch({ type: userConstants.USER_LOGIN_REQUEST });
  try {
    const userInfo = await loginService(data);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: userInfo });
  } catch (error) {
    ErrorAction(error, userConstants.USER_LOGIN_FAILURE, dispatch);
  }
};
const registerAction = (data) => async (dispatch) => {
  dispatch({ type: userConstants.USER_REGISTER_REQUEST });
  try {
    const userInfo = await registerService(data);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: userInfo });
  } catch (error) {
    ErrorAction(error, userConstants.USER_REGISTER_FAILURE, dispatch);
  }
};
const logOutAction = () => async (dispatch) => {
  await logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.GET_FAVORITE_MOVIES_RESET });
};
const updateUserAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const userInfo = await updateProfileService(data);
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: userInfo,
    });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: userInfo });
  } catch (error) {
    ErrorAction(error, userConstants.USER_UPDATE_PROFILE_FAILURE, dispatch);
  }
};
const changePasswordAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await changePasswordService(data);
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, userConstants.USER_CHANGE_PASSWORD_FAILURE, dispatch);
  }
};

const getFavoriteMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
    const response = await getFavoriteMoviesService();
    dispatch({
      type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, userConstants.GET_FAVORITE_MOVIES_FAILURE, dispatch);
  }
};
const deleteFavoriteMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST });
    const response = await deleteFavoriteMoviesService();
    dispatch({
      type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, userConstants.DELETE_FAVORITE_MOVIES_FAILURE, dispatch);
  }
};
const createReviewAction = (id,data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.REVIEW_MOVIE_REQUEST });
    const response = await createReviewService(id,data);
    dispatch({
      type: userConstants.REVIEW_MOVIE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, userConstants.REVIEW_MOVIE_FAILURE, dispatch);
  }
};
const likeMovieAction = (idMovie) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
    const response = await likeMovieService(idMovie);
    dispatch({
      type: userConstants.LIKE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success(response?.message)
  } catch (error) {
    ErrorAction(error, userConstants.LIKE_MOVIE_FAILURE, dispatch);
  }
};
export {
  loginAction,
  registerAction,
  logOutAction,
  changePasswordAction,
  updateUserAction,
  getFavoriteMoviesAction,
  deleteFavoriteMoviesAction,
  createReviewAction,
  likeMovieAction
};
