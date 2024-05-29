import * as categoryContants from "../Constants/categoryContants";
const getCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryContants.GET_CATEGORIES_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case categoryContants.GET_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        categories: action.payload,
      };
    case categoryContants.GET_CATEGORIES_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case categoryContants.GET_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};
const adminDeleteCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryContants.ADMIN_DELETE_CATEGORIES_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case categoryContants.ADMIN_DELETE_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        category: action.payload,
      };
    case categoryContants.ADMIN_DELETE_CATEGORIES_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case categoryContants.ADMIN_DELETE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};
const adminCreateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryContants.ADMIN_CREATE_CATEGORIES_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case categoryContants.ADMIN_CREATE_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    case categoryContants.ADMIN_CREATE_CATEGORIES_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case categoryContants.ADMIN_CREATE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};
const adminUpdateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryContants.ADMIN_UPDATE_CATEGORIES_REQUEST:
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case categoryContants.ADMIN_UPDATE_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    case categoryContants.ADMIN_UPDATE_CATEGORIES_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.payload,
      };
    case categoryContants.ADMIN_UPDATE_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};
export {
  getCategoriesReducer,
  adminDeleteCategoriesReducer,
  adminCreateCategoryReducer,
  adminUpdateCategoryReducer,
};
