import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const trailer = useSelector((state) => state[category].info.trailer);
  // console.log(trailer);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={handleClose}
      className={`${category}-trailer-container fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl backdrop-filter backdrop-blur-md w-full h-full grid place-items-center`}
    >
      <div
        className={`${category}-trailer-wrapper w-full lg:w-[75%] aspect-video bg-zinc-600 bg-opacity-30 relative`}
      >
        <Link
          to={handleClose}
          className="close-btn absolute z-50 -top-9 right-3 sm:right-[15%] sm:top-[3.5%] lg:-right-9 lg:top-2"
        >
          <i className="ri-close-line hover:text-zinc-400 text-base sm:text-lg md:text-xl block bg-zinc-900 px-1 rounded-full"></i>
        </Link>
        <div className="trailer-player w-full h-full rounded-lg overflow-hidden relative">
          {trailer ? (
            <ReactPlayer
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${trailer.key}`}
              config={{
                youtube: {
                  crossOrigin: "anonymous",
                },
              }}
            />
          ) : (
            <div className="w-full h-full grid place-items-center">
              <span className="text-lg sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                There is no trailer...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trailer;
