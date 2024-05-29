import React, { useEffect } from "react";
import SideBar from "./SideBar";
import CustomInput from "../../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { PasswordValidation } from "../../Components/Validation/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InlineError from "../../Components/inlineError";
import toast from "react-hot-toast";
import { changePasswordAction } from "../../Redux/Action/userAction";

const Password = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useSelector(
    (state) => state.userChangePassword
  );
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });
  const onSubmit = (data) => {
    console.log({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    dispatch(
      changePasswordAction({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
    );
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(error);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
  }, [isSuccess, isError, isLoading, dispatch]);
  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <CustomInput
          name="oldPassword"
          register={register("oldPassword")}
          label="Password"
          placeholder="******"
          type="password"
          bg={true}
        />
        {errors.oldPassword && (
          <InlineError error={errors.oldPassword.message}></InlineError>
        )}
        <CustomInput
          name="newPassword"
          register={register("newPassword")}
          label="New Password"
          placeholder="******"
          type="password"
          bg={true}
        />
        {errors.newPassword && (
          <InlineError error={errors.newPassword.message}></InlineError>
        )}
        <CustomInput
          name="comfirmPassword"
          register={register("comfirmPassword")}
          label="Confirm Password"
          placeholder="******"
          type="password"
          bg={true}
        />
        {errors.comfirmPassword && (
          <InlineError error={errors.comfirmPassword.message}></InlineError>
        )}
        <div>
        <button
          disabled={isLoading}
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

export default Password;
