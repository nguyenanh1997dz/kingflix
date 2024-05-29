import React, { useState } from "react";
import MainModal from "./MainModal";
import CustomInput from "../CustomInput";
import Upload from "../Upload";

const CastModal = ({ modalOpen, setModalOpen, cast ,onUpload }) => {
  const [castImg, setCastImg] = useState();
  const [castName, setCastName] = useState("");
  const handleUpload = (e) => {
    e.preventDefault()
    onUpload({ name: castName, img: castImg });
    setCastName("")
    setCastImg()
    setModalOpen(false);
  };
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl opacity-100 scale-100">
        <h2 className="text-3xl font-bold"> {cast ? "Edit" : "Upload"}</h2>
        <form onSubmit={handleUpload} className="flex flex-col gap-6 text-left mt-6">
          <CustomInput
            label="Cast Name"
            placeholder={cast ? cast : "Cast Name"}
            value={castName}
            onChange={(e) => setCastName(e.target.value)}
          ></CustomInput>
          <p className="text-border font-semibold text-sm">Cast Images</p>
          <Upload setUrlImg={setCastImg}></Upload>
          {castImg && (
            <div class="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src={castImg}
                class="w-full h-full object-cover rounded"
              />
            </div>
          )}

          <button type="submit"   className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white">
            {cast ? "Edit" : "Upload"}
          </button>
        </form>
        <div className="absolute right-5 top-5">
          <button
            onClick={() => setModalOpen(false)}
            className=" transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white "
          >
            X
          </button>
        </div>
      </div>
    </MainModal>
  );
};

export default CastModal;
