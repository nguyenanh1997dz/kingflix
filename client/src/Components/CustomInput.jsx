import React from "react";

const CustomInput = ({ label, placeholder, bg, type,  register, name, value ,onChange, readOnly }) => {
  return (  
    <>
      <div className="text-sm w-full">
        <label className="text-border font-semibold">{label}</label>
        <input
          readOnly={readOnly}
          type={type}
          name={name}
          value={value}
          {...register}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
            bg ? "bg-main" : "bg-dry"
          }`}
        />
      </div>
    </>
  );
};

export default CustomInput;