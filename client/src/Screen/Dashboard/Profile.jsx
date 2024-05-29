// Profile.jsx
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Upload from "../../Components/Upload";
import CustomInput from "../../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { ProfileValidation } from "../../Components/Validation/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserAction } from "../../Redux/Action/userAction";
import InlineError from "../../Components/inlineError";
import toast from "react-hot-toast";
import ImagePreview from "../../Components/ImagePreview";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isLoading, isSuccess, isError, error } = useSelector(
    (state) => state.updateUserProfile
  );
  const [imgUrl, setUrlImg] = useState(userInfo?.image);


  const {
    handleSubmit,
    formState: { errors  },
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });
  const onSubmit = (data) => {
  
    dispatch(updateUserAction({ ...data, image: imgUrl }));
  };
  useEffect(() => {
    if (userInfo) {
      setValue("email", userInfo.email);
      setValue("fullName", userInfo.fullName);
    }
  }, [userInfo, setValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated");
      dispatch({type: "USER_UPDATE_PROFILE_RESET"})
    }
    if (isError) {
      toast.error(error);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
  }, [isSuccess, isError, isLoading, dispatch, setUrlImg]);
  return (
    <SideBar>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Profile</h2>
          <div className="w-full grid lg:grid-cols-12 gap-6">
            <div className="col-span-10">
              <Upload setUrlImg={setUrlImg}></Upload>
            </div>
            <ImagePreview image={imgUrl}></ImagePreview>
          </div>
          <CustomInput
            name="fullName"
            register={register("fullName")}
            label="Full Name"
            placeholder="abc@gmail.com"
            type="text"
            bg={true}
          />
          {errors.fullName && (
            <InlineError error={errors.fullName.message}></InlineError>
          )}
          <CustomInput
            name="email"
            register={register("email")}
            label="Email"
            placeholder="abc@gmail.com"
            type="text"
            bg={true}
            readOnly={true}
          />
          {errors.email && (
            <InlineError error={errors.email.message}></InlineError>
          )}

          <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
            <button
              disabled={ isLoading}
              type="submit"
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
            >
              Update
            </button>
          </div>
        </form>
    </SideBar>
  );
};

export default Profile;
