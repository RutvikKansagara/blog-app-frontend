import React from "react";
import { ColorRing } from "react-loader-spinner";
const ButtonComponent = ({label, onClick, isDisabled}) => {
  return (
    <>
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onClick}
          disabled={isDisabled}
        >
          {isDisabled ? (
            <>
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="blocks-loading"
                wrapperClass="inline"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />{" "}
              {label}
            </>
          ) : (
            label 
          )}
        </button>
      </div>
    </>
  );
};

export default ButtonComponent;
