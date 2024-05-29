import React, { useEffect, useState } from "react";
import Title from "../Title";
import { MdRateReview } from "react-icons/md";
import { Message, Select } from "../UserReview";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { reviewsValidation } from "../Validation/userValidation";
import InlineError from "../inlineError";
import Rating from "../Rating";
import { createReviewAction } from "../../Redux/Action/userAction";
import { Empty } from "../../Components/Empty";
const Ratings = [
  { name: "0-Poor", _id: 0 },
  { name: "1-Fair", _id: 1 },
  { name: "2-Good", _id: 2 },
  { name: "3-Very good", _id: 3 },
  { name: "4-Excellent", _id: 4 },
  { name: "5-Masterpice", _id: 5 },
];

const MovieReview = ({ movie ,updateMovie}) => {
  const dispatch = useDispatch()
  const {isSuccess, isLoading, isError } = useSelector((state) => state.reviewMovie);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewsValidation),
  });
  const onSubmit = (data) => {
    dispatch(
      createReviewAction(movie?._id,data)
    );
  };
  useEffect(() => {
    if (isError) {
      dispatch({ type: "REVIEW_MOVIE_RESET" });
    }
    if (isSuccess) {
      updateMovie()
      dispatch({ type: "REVIEW_MOVIE_RESET" });
      reset()
    }
  }, [isError, dispatch,isSuccess,reset]);
  return (
    <div className="my-12">
      <Title title="Reviews" Icon={MdRateReview}></Title>
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">Review</h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie. It will be posted on this page.
          </p>
          <div className="text-sm w-full">
          <Select
              label="Select Rating"
              options={Ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            {errors.rating && (
            <InlineError error={errors.rating.message}></InlineError>
          )}
          <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={watch("rating", false)} />
            </div>
          </div>
          <div className="text-sm w-full">
            <Message   name="message"  register={{ ...register("message") }} lable="Message" placeholder="Reviews"></Message>
            {errors.message && (
            <InlineError error={errors.message.message}></InlineError>
          )}
          </div>
          {userInfo ? (
            <button
            disabled={isLoading}
              type="submit"
              className="bg-subMain text-white py-4 w-full flex-colo rounded"
            >
             {isLoading ? "Loading..." : "Submit"}  
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-main border border-dashed border-border text-subMain py-4 w-full flex-colo rounded"
            >
              Login to review
            </Link>
          )}
        </form>
        <div className="col-span-3 flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">Reviews {`(${movie?.countReviews})`}</h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
            {movie?.reviews?.length > 0 ? (
             movie?.reviews?.slice().reverse().map((review) => (
                <div
                  key={review?._id}
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg"
                >
                  <div className="col-span-2 bg-main hidden md:block">
                    <img
                      src={
                        review?.userImage
                          ? review.userImage
                          : "/images/user.png"
                      }
                      alt={review?.userName}
                      className="w-full h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2>{review?.userName}</h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review?.comment}
                    </p>
                  </div>
                  {/* rates */}
                  <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                    <Rating value={review?.rating} />
                  </div>
                </div>
              ))
            ) : (
              <Empty message={`Be first to rate "${movie?.name}"`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieReview;
