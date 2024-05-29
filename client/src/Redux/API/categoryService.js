import Axios from "./Axios";

const getCategoriesService = async () => {
    const {data} = await Axios.get(`/category`);
    return data
};
const adminDeleteCategoriesService = async (id) => {
    const {data} = await Axios.delete(`/category/${id}`);
    return data
};
const adminCreateCategoryService = async (datas) => {
    const {data} = await Axios.post(`/category`,datas);
    return data
};
const adminUpdateCategoryService = async (datas) => {
    const { data } = await Axios.put(`/category/${datas.id}`, { name: datas.name });
    return data;
};
export {getCategoriesService,adminDeleteCategoriesService,adminCreateCategoryService,adminUpdateCategoryService}