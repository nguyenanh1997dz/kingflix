import Axios from "./Axios";
import qs from 'query-string'
const allMoviesService = async (datas) => {
    const {data} = await Axios.get(`/movie?${qs.stringify(datas)}`);
    return data
};
const getMovieByIdService = async (id) => {
    const {data} = await Axios.get(`/movie/${id}`);
    return data
};
const getRandomMoviesService = async () => {
    const {data} = await Axios.get(`/movie/random`);
    return data
};
const getTopRateMoviesService = async () => {
    const {data} = await Axios.get(`/movie/toprate`);
    return data
};
const createMovieService = async (datas) => {
    const {data} = await Axios.post(`/movie`,datas);
    return data
};
export { allMoviesService,getMovieByIdService,getRandomMoviesService,getTopRateMoviesService,createMovieService}
