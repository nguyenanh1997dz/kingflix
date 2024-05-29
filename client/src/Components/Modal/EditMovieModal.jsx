import React from "react";
import MainModal from "./MainModal";
import CustomInput from "../CustomInput";
const EditMovieModal = ({ modalOpen, setModalOpen }) => {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl opacity-100 scale-100">
        <h2 className="text-3xl font-bold">Edit Movies</h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <CustomInput
            label="Movie Title"
            placeholder= "Cast Name"
          ></CustomInput>
          <button className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white">
            Add
          </button>
          <div className="absolute right-5 top-5">
            <button
              onClick={() => setModalOpen(false)}
              className=" transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white "
            >
              X
            </button>
          </div>
        </form>
      </div>
    </MainModal>
  );
};

export default EditMovieModal;
