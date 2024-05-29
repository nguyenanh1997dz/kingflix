import Axios from "./Axios";

 const loginService = async (datas) => {
    const {data} = await Axios.post(`/user`,datas);
    if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data
};
const registerService = async (datas) => {
  const {data} = await Axios.post(`/user/register`,datas);
  return data
};
const logoutService = async () => {
  localStorage.removeItem('userInfo')
  return {}
};
const isLoginGoogle = async (idMovie) => { 
  const {data} = await Axios.post(`/auth/favorite`,{idMovie});
  return data
}
const updateProfileService = async (datas) => {
  const {data} = await Axios.put(`/user`,datas);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data
};
const changePasswordService = async (datas) => {
  const {data} = await Axios.put(`/user/password`,datas);
  return data
};
const getFavoriteMoviesService = async () => { 
  const {data} = await Axios.get(`/user/favorite`);
  return data
}
const deleteFavoriteMoviesService = async () => { 
  const {data} = await Axios.delete(`/user/favorite`);
  return data
}
const deleteFavoriteMovieByIdService = async (movieId) => { 
  const {data} = await Axios.delete(`/user/favorite/${movieId}`);
  return data
}
const createReviewService = async (id,datas) => { 
  const {data} = await Axios.post(`/movie/review/${id}`,datas);
  return data
}
const likeMovieService = async (idMovie) => { 
  const {data} = await Axios.post(`/user/favorite`,{idMovie});
  return data
}
export {loginService,registerService,logoutService,updateProfileService,changePasswordService,getFavoriteMoviesService,deleteFavoriteMoviesService,deleteFavoriteMovieByIdService,createReviewService,likeMovieService}