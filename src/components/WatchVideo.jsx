import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const WatchVideo = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  //   const { pathname } = useLocation();
  //   const category = pathname.includes("movie") ? "movie" : "tv";
  //   const video = useSelector((state) => state[category].info.videos);
  //   console.log(video);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={handleClose}
      className={`video-container fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl backdrop-filter backdrop-blur-md w-full h-full grid place-items-center`}
    >
      <div
        className={`video-wrapper w-full lg:w-[75%] aspect-video bg-zinc-600 bg-opacity-30 relative`}
      >
        <Link
          to={handleClose}
          className="close-btn absolute z-50 -top-9 right-3 sm:right-[15%] sm:top-[3.5%] lg:-right-9 lg:top-2"
        >
          <i className="ri-close-line hover:text-zinc-400 text-base sm:text-lg md:text-xl block bg-zinc-900 px-1 rounded-full"></i>
        </Link>
        <div className="video-player w-full h-full rounded-lg overflow-hidden relative">
          {key ? (
            <ReactPlayer
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${key}`}
              controls={true}
            />
          ) : (
            <div className="w-full h-full grid place-items-center">
              <span className="text-lg sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                There is no video...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
