import React from "react";
import noimage from "/no-image.jpg";
import { Link } from "react-router-dom";

const Card = ({ data, title }) => {
  // const formattedTitle = title.replace(/[-\s]+/g, "-").toLowerCase();
  // console.log(title);
  return (
    <Link
      to={`/${data.media_type || title}/details/${data.id}`}
      className="card-wrapper flex flex-col aspect-[9/12] bg-zinc-600 text-white rounded-lg overflow-hidden relative"
    >
      <div className="image-container w-full min-h-[70%] max-h-[70vh] inline-block">
        <img
          className="w-full h-auto block bg-cover bg-center bg-no-repeat"
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
                  data.poster_path ||
                  data.backdrop_path ||
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
      </div>

      {title !== "person" && (
        <div className="card-language-info w-full min-h-[10%] bg-[#18273a] text-zinc-300 font-semibold relative px-1 py-1 flex justify-between items-center">
          <span className="bg-[#0184ba] text-xs xs:text-sm rounded-sm px-2 uppercase whitespace-nowrap">
            {data.original_language || "No Info."}
          </span>

          {data.media_type ? (
            <span className="card-media-type-info uppercase text-xs sm:text-sm font-semibold whitespace-nowrap">
              {data.media_type || "No Info."}
            </span>
          ) : (
            <span className="card-vote-info bg-[#2a3f5c] text-xs xs:text-sm rounded-sm px-2 uppercase whitespace-nowrap">
              {Math.floor(data.vote_average * 10) / 10}
            </span>
          )}
        </div>
      )}
      <div className="card-name w-full min-h-[10%] bg-[#0c1622] grid place-items-center pl-2 py-2 relative">
        <h3 className="line-clamp-2 text-xs xs:text-sm font-semibold leading-tight">
          {data.name ||
            data.title ||
            data.original_name ||
            data.original_title ||
            "No Information"}
        </h3>
      </div>
    </Link>
  );
};

export default Card;
