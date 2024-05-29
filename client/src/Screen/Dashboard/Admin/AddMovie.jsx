import React, { useState, useEffect } from "react";
import HomeAdmin from "./HomeAdmin";
import CustomInput from "../../../Components/CustomInput";
import Upload from "../../../Components/Upload";
import { Message, Select } from "../../../Components/UserReview";
import { MovieValidation } from "../../../Components/Validation/userValidation";
import CastModal from "../../../Components/Modal/CastModal";
import { MdDeleteForever, MdOutlineFileUpload } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InlineError from "../../../Components/inlineError";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../../Redux/Action/categoryAction";
import { createMovieAction } from "../../../Redux/Action/movieAction";

const AddMovie = () => {
  const dispatch = useDispatch();
  const { isSuccess, categories } = useSelector((state) => state.getCategories);
  const { isSuccess:isSuccessCreateMovie, isError:isErrorCreateMovie, isLoading:isLoadingCreateMovie } = useSelector((state) => state.createMovie);
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(false);
  const [movieImg, setMovieImg] = useState(null);
  const [posterImg, setPosterImg] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [castList, setCastList] = useState([]);
  const handleUploadCast = (castInfo) => {
    setCastList([...castList, castInfo]);
    setModalOpen(false);
  };
  const handleUploadMovie = (data) => {
    dispatch(createMovieAction(data));
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MovieValidation),
  });
  useEffect(() => {
    setValue("casts", castList.length === 0 ? undefined : castList);
    setValue("titleImage", posterImg);
    setValue("image", movieImg);
    setValue("video", videoUrl);
  }, [posterImg, movieImg, castList, videoUrl,setValue]);

  useEffect(() => {
    if (!modalOpen) {
      setCast();
    }
    dispatch(getCategoriesAction());
  }, [modalOpen, setCast, dispatch]);

  useEffect(() => {
    if (isSuccessCreateMovie) {
      reset();
      setMovieImg(null);
      setPosterImg("");
      setVideoUrl("");
      setCastList([]);
      toast.success("Movie created successfully");
      dispatch({type: "CREATE_MOVIE_RESET"});
    }

    if (isErrorCreateMovie) {
      toast.error("Failed to create movie");
      dispatch({type: "CREATE_MOVIE_RESET"});
    }
  }, [isSuccessCreateMovie, isErrorCreateMovie, reset]);

  return (
    <HomeAdmin>
      <CastModal
        modalOpen={modalOpen}
        cast={cast}
        setModalOpen={setModalOpen}
        onUpload={handleUploadCast}
      ></CastModal>
      <form
        onSubmit={handleSubmit(handleUploadMovie)}
        className="flex flex-col gap-6"
      >
        <h2 className="text-xl font-bold">Create Movie</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <CustomInput
              label="Movie Name"
              placeholder="Movie Name"
              bg={true}
              register={register("name")}
            ></CustomInput>
            {errors.name && (
              <InlineError error={errors.name.message}></InlineError>
            )}
          </div>
          <div className="w-full">
            <CustomInput
              label="Movie Hour"
              placeholder="Movie Hour"
              bg={true}
              register={register("hour")}
            ></CustomInput>
            {errors.hour && (
              <InlineError error={errors.hour.message}></InlineError>
            )}
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <CustomInput
              label="Movie Language"
              placeholder="Movie Language"
              bg={true}
              register={register("language")}
            ></CustomInput>
            {errors.language && (
              <InlineError error={errors.language.message}></InlineError>
            )}
          </div>
          <div className="w-full">
            <CustomInput
              label="Movie Year"
              placeholder="Movie Year"
              bg={true}
              register={register("year")}
            ></CustomInput>
            {errors.year && (
              <InlineError error={errors.year.message}></InlineError>
            )}
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Image Movie</p>
            <Upload setUrlImg={setMovieImg}></Upload>
            {errors.image && (
              <InlineError error={errors.image.message}></InlineError>
            )}
            {movieImg && (
              <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                <img
                  src={movieImg}
                  alt="www"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image Poster Movie
            </p>
            <Upload setUrlImg={setPosterImg}></Upload>
            {errors.titleImage && (
              <InlineError error={errors.titleImage.message}></InlineError>
            )}
            {posterImg && (
              <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                <img
                  src={posterImg}
                  alt="www"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full ">
          <label className="text-border font-semibold text-sm">
            Movie Video
          </label>
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
            {videoUrl ? (
              <div className="relative  w-full bg-main text-sm py-4 border border-border rounded flex-colo">
                Video Uploaded!!!
                <button className="absolute text-subMain text-lg top-1 right-2" onClick={() => setVideoUrl(null)}>X</button>
              </div>
            ) : <Upload setUrlImg={setVideoUrl}></Upload>}
            {errors.video && (
              <InlineError error={errors.video.message}></InlineError>
            )}
          </div>
        </div>
        <div>
          {isSuccess && (
            <Select
              register={register("category")}
              name="category"
              label="Category"
              options={categories}
            ></Select>
          )}
          {errors.category && (
            <InlineError error={errors.category.message}></InlineError>
          )}
        </div>

        <div>
          <Message
            register={register("desc")}
            name="desc"
            lable="Movie Description"
            placeholder="Description"
          ></Message>
          {errors.desc && (
            <InlineError error={errors.desc.message}></InlineError>
          )}
        </div>

        <div className="w-full grid lg:grid-cols-2 gap-6 items-start ">
          <div>
          <button
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
            className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
          >
            Add Cast
          </button>
          {errors.casts && (
              <InlineError error={errors.casts.message}></InlineError>
            )}
          </div>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">

            {castList.length > 0 &&
              castList.map((cast) => (
                <div
                  key={cast?._id}
                  className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                >
                  <img
                    src={cast?.img}
                    alt="cast img"
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p>{cast?.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      type="button"
                      className="w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
        >
          <MdOutlineFileUpload /> Add Movie
        </button>
      </form>
    </HomeAdmin>
  );
};

export default AddMovie;
