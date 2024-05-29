import React from "react";

const ImagePreview = ({image}) => {
  return (
    <div className="col-span-2">
      <div className="w-32 mt-2 h-32 p-2 bg-main border border-border rounded">
        <img
          src={image}
          alt="avatar"
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
};

export default ImagePreview;
