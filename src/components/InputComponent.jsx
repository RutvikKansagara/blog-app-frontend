import React from "react";

const InputComponent = ({
  FieldName,
  id,
  type,
  placeholder,
  name,
  value,
  onChange,
  register
}) => {
  return (
    <>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor={FieldName}
        >
          {FieldName}
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          ref={register}
        />
      </div>
    </>
  );
};

export default InputComponent;
