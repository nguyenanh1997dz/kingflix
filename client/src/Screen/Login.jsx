import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import { LuLogIn } from "react-icons/lu";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../Components/Validation/userValidation";
import InlineError from "../Components/inlineError";
import { loginAction } from "../Redux/Action/userAction";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, error } = useSelector(
    (state) => state.userLogin
  );
  const [searchParams] = useSearchParams();
  const parsedData = searchParams.get('data');  

  const googleAuth = () => {
		window.open(
			`https://kingflix.onrender.com/auth/google/callback`,
			"_self"
		);
	};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      toast.error(error);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [isSuccess, isError, isLoading, dispatch, navigate]);
  useEffect(() => {
    if (parsedData) {
      localStorage.setItem("userInfo", parsedData);
      dispatch({ type: "USER_LOGIN_SUCCESS",payload: JSON.parse(parsedData) });
    }
  },[parsedData])

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border"
        >
          <img
            src="/images/logo2.jpg"
            alt=""
            className="w-full h-16 object-contain"
          />
          <CustomInput
            name="email"
            register={register("email")}
            label="Email"
            placeholder="abc@gmail.com"
            type="text"
            bg={true}
          />
          {errors.email && (
            <InlineError error={errors.email.message}></InlineError>
          )}
          <CustomInput
            name="password"
            register={register("password")}
            label="Password"
            placeholder="******"
            type="password"
            bg={true}
          />
          {errors.password && (
            <InlineError error={errors.password.message}></InlineError>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            <LuLogIn />
            Submit
          </button>
          <p className="text-center text-border">
            Don't have an account?
            <Link className="text-dryGray font-semibold ml-2" to="/register">
              Sign Up
            </Link>
          </p>
          <button
            type="button"
            onClick={() => {
              alert("Please enter your")
            }}
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <FaGoogle className="mr-2 -ml-1 w-4 h-4" />
            Sign in with Google
          </button>
        </form>
     
      </div>
    </Layout>
  );
};

export default Login;
