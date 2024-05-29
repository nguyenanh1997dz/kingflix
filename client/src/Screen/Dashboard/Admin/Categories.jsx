import HomeAdmin from "./HomeAdmin";
import { Table2 } from "../../../Components/Table2";
import { IoIosAddCircle } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import CategoryModal from "../../../Components/Modal/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction,adminDeleteCategoriesAction} from "../../../Redux/Action/categoryAction";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from "react-hot-toast";
import Loader from "../../../Components/Loader";


const Categories = () => {
  const [modalOpen,setModalOpen] = useState(false)
  const dispatch = useDispatch();
  const {isLoading, isSuccess,categories } = useSelector(
    (state) => state.getCategories
  );
  const { isSuccess:isSuccessDeltete,isError:isErrorDeltete,error:errorDelete } = useSelector(
    (state) => state.adminDeleteCategories
  );
  const [category, setCategory] = useState(null);
  const onEditCategory = (id) => {
    setModalOpen(true)
    setCategory(id)
  }
  const onDeleCategory = (id) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete this category?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(adminDeleteCategoriesAction(id))
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };
  useEffect(() => {
    dispatch(getCategoriesAction());
    if (modalOpen === false) {
      setCategory()
    }
    if (isSuccessDeltete) {
      toast.success("Delete category successfully")
      dispatch({ type: "ADMIN_DELETE_CATEGORIES_RESET" })
    }
    if (isErrorDeltete) {
      toast.success(errorDelete)
      dispatch({ type: "ADMIN_DELETE_CATEGORIES_RESET" })
    }
  }, [dispatch, modalOpen,isErrorDeltete,isSuccessDeltete]);
  return (
    <HomeAdmin>
      <CategoryModal modalOpen={modalOpen} category={category} setModalOpen={setModalOpen}></CategoryModal>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button  onClick={() => setModalOpen(true)} className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded">
            <IoIosAddCircle />
            Create
          </button>
        </div>
        {isLoading && <Loader></Loader>}
       {isSuccess &&  <Table2 onDelete={onDeleCategory} onEdit={onEditCategory}  data={categories} admin={true}></Table2>}
      </div>
    </HomeAdmin>
  );
};

export default Categories;
