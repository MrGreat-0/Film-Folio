import React from "react";
import noimage from "/no-image.jpg";

const Card = ({ data }) => {
  return (
    <div className="card-wrapper w-full h-full flex flex-col aspect-[9/12] bg-zinc-600 text-white rounded-lg overflow-hidden relative">
      <img
        style={{ objectPosition: "center center" }}
        className="w-full h-[80%]  object-cover"
        src={
          data.poster_path ||
          data.backdrop_path ||
          data.profile_path ||
          (data.known_for &&
            data.known_for[0] &&
            data.known_for[0].poster_path) ||
          (data.known_for &&
            data.known_for[1] &&
            data.known_for[1].backdrop_path)
            ? `https://image.tmdb.org/t/p/original/${
                data.backdrop_path ||
                data.poster_path ||
                data.profile_path ||
                (data.known_for &&
                  data.known_for[0] &&
                  data.known_for[0].poster_path) ||
                (data.known_for &&
                  data.known_for[1] &&
                  data.known_for[1].backdrop_path)
              }`
            : noimage
        }
        alt={
          data.name ||
          data.title ||
          data.original_name ||
          data.original_title ||
          "Image"
        }
      />
      <div className="w-full min-h-[10%] bg-[#18273a] text-zinc-300 font-semibold relative px-1 py-1 flex justify-between items-center">
        <span className="bg-[#0184ba] text-xs xs:text-sm rounded-sm px-2 uppercase whitespace-nowrap">
          {data.original_language || "No Info."}
        </span>
        <span className="uppercase text-xs sm:text-sm font-semibold whitespace-nowrap">
          {data.media_type || "No Info."}
        </span>
      </div>
      <div className="w-full min-h-[10%] bg-[#0c1622] grid place-items-center pl-2 py-2 relative">
        <h3 className="line-clamp-2 text-xs xs:text-sm text-zinc-200 font-semibold leading-tight">
          {data.name ||
            data.title ||
            data.original_name ||
            data.original_title ||
            "No Information"}
        </h3>
      </div>
    </div>
  );
};

export default Card;
