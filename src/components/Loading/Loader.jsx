import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen grid place-items-center bg-zinc-900">
      <img
        className="w-[100px] md:w-[130px] lg:w-[150px] select-none"
        src="/Loader.gif"
        alt="loader"
      />
    </div>
  );
};

export default Loader;
