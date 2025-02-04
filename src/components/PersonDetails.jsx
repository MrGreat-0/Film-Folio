import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { asyncLoadPerson, removePerson } from "../store/actions/personActions";
import Loader from "../components/Loading/Loader";
import ContentTitle from "./templates/ContentTitle";
import Content from "./templates/Content";
import noimage from "/no-image.jpg";

const PersonDetails = () => {
  const [isExpand, setIsExpand] = useState(false);

  const { id } = useParams();

  const { info } = useSelector((state) => state.person);
  // console.log(info);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadPerson(id));

    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  const PersonSlider = ({ data, src, type }) => {
    return (
      <div className="person-slide w-full h-[32vh] bg-zinc-5 flex gap-6 self-center items-center px-2 select-none overflow-y-auto">
        {data.slice(0, 20).map((d, i) => {
          return (
            <div
              key={i}
              className="h-[85%] md:h-[95%] bg-zinc-600 rounded-lg overflow-hidden flex flex-shrink-0"
            >
              <div className="season-slider-wrapper flex flex-col">
                <img
                  className="w-full h-full block bg-cover bg-center bg-no-repeat"
                  src={
                    d.file_path || d.backdrop_path || d.poster_path
                      ? `${src}${
                          d.file_path || d.backdrop_path || d.poster_path
                        }`
                      : noimage
                  }
                  alt={d.name}
                  loading="lazy"
                />
                <span className="text-center text-xs xs:text-sm font-semibold">
                  {d.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const CastInfo = ({ data, type }) => {
    return (
      <div className="w-full h-[60vh] overflow-y-auto shadow-md shadow-zinc-400 relative">
        {data.slice(0, 30).map((data, ind) => (
          <Link
            to={`/${type}/details/${data.id}`}
            key={ind}
            className={`cast-${type} w-full flex items-center gap-6 px-4 py-3 sm:px-6 sm:py-4 hover:bg-zinc-800 ${
              ind % 2 === 0 ? "bg-zinc-900" : "bg-neutral-900"
            }`}
          >
            <img
              className="h-14 w-11 block bg-cover bg-center bg-no-repeat bg-zinc-600 rounded-sm"
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
                data.title ||
                data.original_title ||
                data.name ||
                data.original_name ||
                "Image"
              }
              loading="lazy"
            />
            <div className="dropDown-right flex flex-col">
              <span className="text-zinc-400 text-base sm:text-lg">
                {data.name ||
                  data.title ||
                  data.original_name ||
                  data.original_title}
              </span>

              <div className="character-name flex gap-2 text-zinc-400 text-base">
                <span>Character:</span>
                <span>{data.character || "No Info."}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return info ? (
    <div className="person-detatil-wrapper w-full min-h-[90vh] relative">
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.7),rgba(0,0,0,0.9))`,
        }}
        className="poster-wrapper w-full min-h-[90vh] flex items-center flex-col lg:flex-row px-2 relative"
      >
        <div className="person-detail-left w-full lg:w-[35%] h-full flex lg:items-center justify-center lg:justify-end my-10 lg:my-0 relative">
          <div className="person-poster w-[75%] h-[80%] md:w-[65%] md:h-[80%] lg:w-[90%] lg:h-[90%] xl:w-[70%] xl:h-[85%] image-container inline-block rounded-lg overflow-hidden">
            <img
              className="w-full h-full block bg-cover bg-center bg-no-repeat"
              src={
                info.detail.profile_path ||
                info.detail.poster_path ||
                info.detail.backdrop_path ||
                (info.detail.known_for &&
                  info.detail.known_for[0] &&
                  info.detail.known_for[0].poster_path) ||
                (info.detail.known_for &&
                  info.detail.known_for[1] &&
                  info.detail.known_for[1].backdrop_path)
                  ? `https://image.tmdb.org/t/p/original/${
                      info.detail.profile_path ||
                      info.detail.poster_path ||
                      info.detail.backdrop_path ||
                      (info.detail.known_for[0].poster_path &&
                        info.detail.known_for &&
                        info.detail.known_for[0]) ||
                      (info.detail.known_for &&
                        info.detail.known_for[1] &&
                        info.detail.known_for[1].backdrop_path)
                    }`
                  : noimage
              }
              alt={
                info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title ||
                "Image"
              }
              loading="lazy"
            />
          </div>
        </div>
        <div className="person-detail-right w-full lg:w-[55%] h-full flex flex-col justify-center lg:pl-12 mb-10 lg:my-10 relative">
          <h1 className="person-name font-semibold text-center lg:text-start text-3xl xs:text-4xl md:text-5xl relative">
            {info.detail.name ||
              info.detail.original_name ||
              info.detail.title ||
              info.detail.original_title ||
              "No Information"}
          </h1>

          <div className="person-links border-y-[0.1px] border-y-zinc-600 lg:border-y-0 py-4 flex gap-10 my-6 justify-center lg:justify-start relative">
            {info.detail.homepage && (
              <a
                className="flex items-center gap-2"
                href={info.detail.homepage}
                target="_blank"
              >
                <i className="ri-link text-2xl"></i>
                Official Website
              </a>
            )}
            {(info.detail.imdb_id || info.externalID.imdb_id) && (
              <a
                href={`https://www.imdb.com/name/${
                  info.detail.imdb_id || info.externalID.imdb_id
                }`}
                target="_blank"
              >
                <img
                  className="w-8 block bg-cover bg-center bg-no-repeat"
                  src="/imdb-icon.svg"
                  alt="imdb-logo"
                  loading="lazy"
                />
              </a>
            )}
            {info.detail.adult && (
              <img
                className="w-8 block bg-cover bg-center bg-no-repeat bg-zinc-200 rounded-full"
                src="/18-icon.jpg"
                alt="imdb-logo"
                loading="lazy"
              />
            )}
          </div>
          <div className="person-metadata relative">
            <div className="metadata-wrapper font-semibold lg:flex lg:gap-5 xl:gap-8 border-b-[0.1px] border-b-zinc-600 pb-4 text-nowrap relative">
              <div className="metadata-info flex gap-2 relative">
                <span>Known For:</span>
                <span className="text-zinc-400">
                  {info.detail.known_for_department || "No Information"}
                </span>
              </div>
              <div className="metadata-info flex gap-2 relative">
                <span>Birthday:</span>
                <span className="text-zinc-400">
                  {info.detail.birthday || "No Information"}
                </span>
              </div>
              {info.detail.deathday && (
                <div className="metadata-info flex gap-2 relative">
                  <span>Deathday:</span>
                  <span className="text-zinc-400">{info.detail.deathday}</span>
                </div>
              )}
              <div className="metadata-info flex gap-2 relative">
                <span>Gender:</span>
                <span className="text-zinc-400">
                  {info.detail?.gender === 1
                    ? "Female"
                    : info.detail?.gender === 2
                    ? "Male"
                    : "Not Information"}
                </span>
              </div>
            </div>
            <div className="metadata-wrapper font-semibold flex gap-2 border-b-[0.1px] border-b-zinc-600 py-4 relative">
              <span className="text-nowrap">Birth Place:</span>
              <span className="text-zinc-400">
                {info.detail.place_of_birth || "No Information"}
              </span>
            </div>
            {info.externalID && (
              <div className="social-links-wrapper font-semibold border-b-[0.1px] border-b-zinc-600 pb-4 pt-3 text-nowrap flex flex-col xs:flex-row xs:items-center gap-2 relative">
                <h3 className="text-xl font-semibold pb-3 xs:pb-0">
                  Social Links:
                </h3>
                <div className="social-links grid grid-cols-3 place-items-center gap-y-4 xs:grid-cols-none xs:flex xs:gap-5 text-2xl text-zinc-300 relative">
                  {info.externalID.facebook_id && (
                    <a
                      href={`https://www.facebook.com/${info.externalID.facebook_id}`}
                      target="_blank"
                    >
                      <i className="ri-facebook-circle-fill"></i>
                    </a>
                  )}

                  {info.externalID.instagram_id && (
                    <a
                      href={`https://www.instagram.com/${info.externalID.instagram_id}`}
                      target="_blank"
                    >
                      <i className="ri-instagram-fill"></i>
                    </a>
                  )}

                  {info.externalID.tiktok_id && (
                    <a
                      href={`https://www.tiktok.com/@${info.externalID.tiktok_id}`}
                      target="_blank"
                    >
                      <i className="ri-tiktok-fill"></i>
                    </a>
                  )}

                  {info.externalID.twitter_id && (
                    <a
                      href={`https://twitter.com/${info.externalID.twitter_id}`}
                      target="_blank"
                    >
                      <i className="ri-twitter-x-fill"></i>
                    </a>
                  )}

                  {info.externalID.wikidata_id && (
                    <a
                      href={`https://en.wikipedia.org/wiki/${(
                        info.detail.name ||
                        info.detail.original_name ||
                        info.detail.title ||
                        info.detail.original_title
                      ).replace(/\s+/g, "_")}`}
                      target="_blank"
                    >
                      <i className="ri-earth-fill"></i>
                    </a>
                  )}

                  {info.externalID.youtube_id && (
                    <a
                      href={`https://www.youtube.com/channel/${info.externalID.youtube_id}`}
                      target="_blank"
                    >
                      <i className="ri-youtube-fill"></i>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="other-stuff w-full min-h-screen text-lg px-2 relative">
        <div className="person-biography lg:w-[95%] xl:[85%] mx-auto pt-5 relative">
          <h2 className="text-4xl font-semibold pb-3">Biography</h2>
          <p className="text-base xs:text-lg leading-snug">
            {info.detail.biography
              ? isExpand
                ? info.detail.biography
                : info.detail.biography.slice(0, 500) + "..."
              : "No Information"}
            {info.detail?.biography?.length > 500 && (
              <button
                onClick={() => setIsExpand(!isExpand)}
                className="text-xs px-1 text-blue-500 hover:underline"
              >
                {isExpand ? "Hide" : "Show More"}
              </button>
            )}
          </p>
        </div>

        <div className="person-slider w-full flex flex-col items-center py-10 gap-10 relative">
          <div className="person-slide-wrapper w-[90%]">
            <h3 className="font-semibold text-4xl text-nowrap pl-3 pb-3">
              Photos
            </h3>
            {info.images?.length > 0 ? (
              <PersonSlider
                data={info.images}
                src={"https://image.tmdb.org/t/p/original/"}
                type="image"
              />
            ) : (
              <span className="text-zinc-400">No Information</span>
            )}
          </div>
        </div>

        <div className="cast-information w-full flex flex-col gap-6 lg:gap-4 lg:flex-row relative">
          <div className="movie-cast-in lg:w-1/2 rounded-md overflow-hidden mx-auto lg:mx-0 relative">
            <h3 className="font-semibold text-4xl text-nowrap pl-3 pb-5">
              Movie (Cast In)
            </h3>
            {info?.movieCredits?.cast?.length ? (
              <CastInfo data={info.movieCredits.cast} type="movie" />
            ) : (
              "No Information"
            )}
          </div>

          <div className="tv-cast-in lg:w-1/2 rounded-md overflow-hidden mx-auto lg:mx-0 relative">
            <h3 className="font-semibold text-4xl text-nowrap pl-3 pb-5">
              TV (Cast In)
            </h3>
            {info?.tvCredits?.cast?.length ? (
              <CastInfo data={info.tvCredits.cast} type="tv" />
            ) : (
              "No Information"
            )}
          </div>
        </div>
      </div>

      <div className="person-related-stuff w-full h-full pb-10 relative">
        <div className="person-cast-in w-[95%] h-full mx-auto">
          <ContentTitle title="Cast In" toggleSwitchCount={0} />
          <div className="person-cast-wrapper w-full h-full relative">
            {info.combinedCredits.cast?.length ? (
              <Content
                cardData={info.combinedCredits.cast.slice(0, 14)}
                // title="movie"
              />
            ) : (
              <span className="text-zinc-400">No Information</span>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PersonDetails;
