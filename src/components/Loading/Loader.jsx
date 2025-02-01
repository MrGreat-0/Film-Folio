import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[90vh] grid place-items-center bg-zinc-900">
      <img
        className="w-[110px] md:w-[140px] lg:w-[170px] select-none"
        src="/Loader.gif"
        alt="loader"
        draggable="false"
      />
    </div>
  );
};

export default Loader;
