import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import CustomInput from "../CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { CategoryValidation } from "../Validation/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InlineError from "../inlineError";
import { adminCreateCategoryAction, adminUpdateCategoryAction } from "../../Redux/Action/categoryAction";
import toast from "react-hot-toast";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  
  const { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError: isCreateError, error: createError } = useSelector(
    (state) => state.adminCreateCategory
  );

  const { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError } = useSelector(
    (state) => state.adminUpdateCategory
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(CategoryValidation),
  });

  const submitHandler = (data) => {
    if (category) {
      dispatch(adminUpdateCategoryAction({ id: category._id, name: data.name }));
    } else {
      dispatch(adminCreateCategoryAction(data.name));
    }
  };

  useEffect(() => {
    if (category) {
      setTitle(category.name);
    } else {
      setTitle("");
    }

    if (!modalOpen) {
      setTitle("");
      reset();
    }
  }, [category, modalOpen, reset]);

  useEffect(() => {
    if (isCreateError) {
      toast.error(createError);
      dispatch({ type: "ADMIN_CREATE_CATEGORIES_RESET" });
    }
    if (isUpdateError) {
      toast.error(updateError);
      dispatch({ type: "ADMIN_UPDATE_CATEGORIES_RESET" });
    }
    if (isCreateSuccess) {
      toast.success("Category created successfully");
      dispatch({ type: "ADMIN_CREATE_CATEGORIES_RESET" });
    }
    if (isUpdateSuccess) {
      toast.success("Category updated successfully");
      dispatch({ type: "ADMIN_UPDATE_CATEGORIES_RESET" });
    }
  }, [dispatch, isCreateError, isCreateSuccess, createError, isUpdateError, isUpdateSuccess, updateError, setModalOpen]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl opacity-100 scale-100">
        <h2 className="text-3xl font-bold">
          {category ? "Edit Category" : "Create Category"}
        </h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <CustomInput
            label="Category Name"
            placeholder="Enter category name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            register={register("name")}
          />
          {errors.name && <InlineError error={errors.name.message} />}
          <button
            type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            disabled={isCreateLoading || isUpdateLoading}
          >
            {isCreateLoading || isUpdateLoading ? "Processing..." : category ? "Update" : "Add"}
          </button>
        </form>
        <div className="absolute right-5 top-5">
          <button
            onClick={() => setModalOpen(false)}
            className="transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white"
          >
            X
          </button>
        </div>
      </div>
    </MainModal>
  );
};

export default CategoryModal;
