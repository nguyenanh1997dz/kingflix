import {
    adminDeleteCategoriesService,
    adminCreateCategoryService,
    adminUpdateCategoryService,
    getCategoriesService
  } from "../API/categoryService";
  import * as categoryContants from "../Constants/categoryContants";
  import { ErrorAction } from "../Protection";
  
  const getCategoriesAction = () => async (dispatch) => {
    dispatch({ type: categoryContants.GET_CATEGORIES_REQUEST });
    try {
      const response = await getCategoriesService();
      dispatch({
        type: categoryContants.GET_CATEGORIES_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorAction(
        error,
        categoryContants.GET_CATEGORIES_FAILURE,
        dispatch
      );
    }
  };
  const adminDeleteCategoriesAction = (id) => async (dispatch) => {
    dispatch({ type: categoryContants.ADMIN_DELETE_CATEGORIES_REQUEST });
    try {
      const response = await adminDeleteCategoriesService(id);
      dispatch({
        type: categoryContants.ADMIN_DELETE_CATEGORIES_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorAction(
        error,
        categoryContants.ADMIN_DELETE_CATEGORIES_FAILURE,
        dispatch
      );
    }
  };
  const adminCreateCategoryAction = (data) => async (dispatch) => {
    dispatch({ type: categoryContants.ADMIN_CREATE_CATEGORIES_REQUEST });
    try {
      const response = await adminCreateCategoryService({ name: data });
      dispatch({
        type: categoryContants.ADMIN_CREATE_CATEGORIES_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorAction(
        error,
        categoryContants.ADMIN_CREATE_CATEGORIES_FAILURE,
        dispatch
      );
    }
  };
  const adminUpdateCategoryAction = (data) => async (dispatch) => {
    dispatch({ type: categoryContants.ADMIN_UPDATE_CATEGORIES_REQUEST });
    try {
      const response = await adminUpdateCategoryService(data);
      dispatch({
        type: categoryContants.ADMIN_UPDATE_CATEGORIES_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorAction(
        error,
        categoryContants.ADMIN_UPDATE_CATEGORIES_FAILURE,
        dispatch
      );
    }
  };
  export {
    getCategoriesAction,
    adminDeleteCategoriesAction,
    adminCreateCategoryAction,
    adminUpdateCategoryAction,
  };
  