import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import noimage from "/no-image.jpg";
import posterStyle from "./Poster.module.css";

const Poster = ({ poster, title }) => {
  // const formattedTitle = title.replace(" ", "-").toLowerCase();
  // console.log(poster);
  const PosterDetail = ({ p, infoStyle }) => {
    return (
      <div
        className={`poster-info-left h-full ${infoStyle} text-left flex-col gap-2 sm:gap-4 pl-8 pb-6 xl:pb-0 justify-end xl:justify-center items-start`}
      >
        <h1 className="poster-name text-zinc-100 text-2xl md:text-3xl xl:text-5xl font-semibold uppercase w-[95%] md:w-1/2 xl:w-full line-clamp-2 lg:line-clamp-3">
          {p.name ||
            p.title ||
            p.original_name ||
            p.original_title ||
            "No Information"}
        </h1>
        <div className="poster-info-left-down hidden md:flex gap-3 items-center cursor-pointer relative">
          {p.release_date ? (
            <span className="text-zinc-300 flex gap-1 items-center">
              <i className="ri-megaphone-fill text-zinc-500"></i>
              {p.release_date || "No Information"}
            </span>
          ) : (
            <span className="text-zinc-300 flex gap-1 items-center">
              <i className="ri-star-fill text-zinc-500"></i>
              {p.vote_average || "No Information"}
            </span>
          )}
          {p.media_type ? (
            <span className="text-zinc-300 uppercase flex gap-1 items-center">
              <i className="ri-album-fill text-zinc-500"></i>
              {p.media_type || "No Information"}
            </span>
          ) : (
            <span className="text-zinc-300 uppercase flex gap-1 items-center">
              <i className="ri-global-fill text-zinc-500"></i>
              {p.original_language || "No Information"}
            </span>
          )}
        </div>
        <p className="poster-detail font-semibold md:text-zinc-300 text-sm line-clamp-2 xl:line-clamp-none xl:text-lg xl:leading-tight w-[90%] md:w-1/2 xl:w-[95%]">
          {p.overview ? (
            <>
              {p.overview.slice(0, 150)}...
              <Link
                to={`/${p.media_type || formattedTitle}/details/${p.id}`}
                className="text-blue-400 text-base"
              >
                more
              </Link>
            </>
          ) : (
            "No Information"
          )}
        </p>
        <Link
          to={`${title}/details/${p.id}/watch`}
          className="poster-trailer-btn py-1 px-2 xl:py-2 xl:px-6 rounded-lg text-zinc-100 font-semibold lg:text-lg bg-blue-500 uppercase"
        >
          <i className="ri-play-large-fill"></i> Watch Trailer
        </Link>
      </div>
    );
  };

  return (
    <div className="poster-parent w-full h-[70vw] md:h-[60vh] md:px-2 relative">
      <Swiper
        pagination={{
          dynamicBullets: true, // Pagination with dynamic bullets
        }}
        autoplay={{
          delay: 10000, // Time in ms between slides
          disableOnInteraction: false, // Keep autoplay even when user interacts with the Swiper
        }}
        loop={true}
        grabCursor={true}
        modules={[Pagination, Autoplay]} // Use the Autoplay module along with Pagination
        className="mySwiper w-full h-full"
      >
        {poster.map((p, i) => {
          return (
            <SwiperSlide key={i} className="w-full h-full">
              <div className="poster-wrapper h-full w-full rounded-3xl bg-[#142030] overflow-hidden flex relative">
                <PosterDetail
                  p={p}
                  infoStyle={"w-2/5 xl:flex hidden relative"}
                />
                <div
                  className={`poster-image-right ${posterStyle.posterRight} h-full w-full xl:w-3/5 relative bg-slate-600`}
                >
                  <img
                    className="w-full h-full md:h-auto block bg-cover bg-center bg-no-repeat relative"
                    src={
                      p.backdrop_path ||
                      p.poster_path ||
                      p.profile_path ||
                      (p.known_for &&
                        p.known_for[0] &&
                        p.known_for[0].poster_path) ||
                      (p.known_for &&
                        p.known_for[1] &&
                        p.known_for[1].backdrop_path)
                        ? `https://image.tmdb.org/t/p/original/${
                            p.backdrop_path ||
                            p.poster_path ||
                            p.profile_path ||
                            (p.known_for &&
                              p.known_for[0] &&
                              p.known_for[0].poster_path) ||
                            (p.known_for &&
                              p.known_for[1] &&
                              p.known_for[1].backdrop_path)
                          }`
                        : noimage
                    }
                    alt={
                      p.name ||
                      p.title ||
                      p.original_name ||
                      p.original_title ||
                      "Image"
                    }
                    loading="lazy"
                  />
                  <PosterDetail
                    p={p}
                    infoStyle={
                      "w-full flex xl:hidden absolute top-0 left-0 z-10"
                    }
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Poster;
