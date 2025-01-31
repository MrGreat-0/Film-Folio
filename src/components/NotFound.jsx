import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found w-full h-[90vh] grid place-items-center select-none relative">
      <div className="not-found-wrapper w-fit h-fit flex flex-col gap-8 text-center relative">
        <div className="404-text flex gap-4 font-black text-6xl xs:text-7xl sm:text-9xl md:text-[9rem] lg:text-[10rem] relative">
          <h1 className="text-blue-500">404</h1> <h1>Error</h1>
        </div>
        <div className="not-found-message font-semibold text-lg relative">
          <span>Oops! That page doesn't exist!</span>
        </div>
        <Link
          to={"/"}
          className="back-home-btn font-semibold text-base sm:text-lg bg-blue-500 py-2 px-6 sm:px-7 md:py-3 md:px-8 rounded-3xl w-max mx-auto relative"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
