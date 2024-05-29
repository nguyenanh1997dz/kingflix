export const ErrorAction = (error, action, dispatch) => {
    const message = error?.response?.data.message || 
                    error?.response?.data.error || 
                    "Something went wrong.";
    if (error?.response?.status === 401) {
        dispatch({ type: "USER_LOGOUT" });
        localStorage.removeItem("userInfo");
    }
    return dispatch({ type: action, payload: message });
}
