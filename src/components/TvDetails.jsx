import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { asyncLoadTV, removeTV } from "../store/actions/tvActions";
import Loader from "../components/Loading/Loader";
import ContentTitle from "./templates/ContentTitle";
import Content from "./templates/Content";
import noimage from "/no-image.jpg";

const TvDetails = () => {
  const { id } = useParams();

  const { info } = useSelector((state) => state.tv);
  console.log(info);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadTV(id));

    return () => {
      dispatch(removeTV());
    };
  }, [id]);

  const TvSlider = ({ data, src, type }) => {
    return (
      <div className="tv-slide w-full h-[32vh] bg-zinc-5 flex gap-6 self-center items-center px-2 select-none overflow-y-auto">
        {data.slice(0, 20).map((d, i) => {
          return (
            <div
              key={i}
              className="h-[85%] md:h-[95%] bg-zinc-600 rounded-lg overflow-hidden flex flex-shrink-0"
            >
              {type === "image" ? (
                <img
                  className="w-full h-full block bg-cover bg-center bg-no-repeat"
                  src={
                    d.file_path || d.backdrop_path || d.poster_path
                      ? `${src}${
                          d.file_path || d.backdrop_path || d.poster_path
                        }`
                      : noimage
                  }
                  alt="tv-clip"
                />
              ) : type === "video" ? (
                <img
                  className="w-full h-full block bg-cover bg-center bg-no-repeat"
                  src={
                    d.key
                      ? `https://img.youtube.com/vi/${d.key}/mqdefault.jpg`
                      : noimage
                  }
                  alt={d.name}
                />
              ) : (
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
                  />
                  <span className="text-center text-xs xs:text-sm font-semibold">
                    {d.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return info ? (
    <div className="tv-detatil-wrapper w-full min-h-screen relative">
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.7),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${
            info.detail.backdrop_path ||
            (info.detail.known_for &&
              info.detail.known_for[1] &&
              info.detail.known_for[1].backdrop_path) ||
            info.detail.poster_path ||
            (info.detail.known_for &&
              info.detail.known_for[0] &&
              info.detail.known_for[0].poster_path)
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="poster-wrapper w-full min-h-[90vh] flex items-center flex-col lg:flex-row px-2 relative"
      >
        <div className="tv-detail-left w-full lg:w-[35%] h-full flex lg:items-center justify-center lg:justify-end my-10 lg:my-0 relative">
          <div className="tv-poster w-[75%] h-[80%] md:w-[65%] md:h-[80%] lg:w-[90%] lg:h-[90%] xl:w-[70%] xl:h-[85%] image-container inline-block rounded-lg overflow-hidden">
            <img
              className="w-full h-full block bg-cover bg-center bg-no-repeat"
              src={
                info.detail.poster_path ||
                info.detail.backdrop_path ||
                info.detail.profile_path ||
                (info.detail.known_for &&
                  info.detail.known_for[0] &&
                  info.detail.known_for[0].poster_path) ||
                (info.detail.known_for &&
                  info.detail.known_for[1] &&
                  info.detail.known_for[1].backdrop_path)
                  ? `https://image.tmdb.org/t/p/original/${
                      info.detail.poster_path ||
                      info.detail.backdrop_path ||
                      info.detail.profile_path ||
                      (info.detail.known_for &&
                        info.detail.known_for[0] &&
                        info.detail.known_for[0].poster_path) ||
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
            />
          </div>
        </div>
        <div className="tv-detail-right w-full lg:w-[55%] h-full flex flex-col justify-center lg:pl-12 mb-10 lg:my-10 relative">
          <h1 className="tv-name font-semibold text-center lg:text-start text-3xl xs:text-4xl md:text-5xl relative">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title ||
              "No Information"}
          </h1>
          <h3 className="tv-tagline text-center lg:text-start text-zinc-400 text-base sm:text-lg lg:text-xl mt-2 italic">
            {info.detail.tagline}
          </h3>
          <div className="tv-genres flex flex-wrap justify-center lg:justify-start gap-6 my-6 text-zinc-100 text-sm relative">
            {info.detail.genres.map((g) => {
              return (
                <h5
                  key={g.id}
                  className="border border-zinc-100 rounded-xl px-2 cursor-default hover:italic"
                >
                  {g.name}
                </h5>
              );
            })}
          </div>
          <div className="tv-overview lg:w-[95%] xl:[85%] relative">
            <h2 className="text-4xl font-semibold pb-2">Overview</h2>
            <p className="text-lg leading-snug">
              {info.detail.overview || "No Information"}
            </p>
          </div>
          <div className="tv-links border-y-[0.1px] border-y-zinc-600 lg:border-y-0 py-4 flex gap-10 my-6 justify-center lg:justify-start relative">
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
            {info.externalID.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${info.externalID.imdb_id}`}
                target="_blank"
              >
                <img
                  className="w-8 block bg-cover bg-center bg-no-repeat"
                  src="/imdb-icon.svg"
                  alt="imdb-logo"
                />
              </a>
            )}
          </div>
          <div className="tv-metadata relative">
            <div className="metadata-wrapper font-semibold lg:flex lg:gap-8 border-b-[0.1px] border-b-zinc-600 pb-4 text-nowrap relative">
              <div className="metadata-info flex gap-2 relative">
                <span>Status:</span>
                <span className="text-zinc-400">
                  {info.detail.status || "No Information"}
                </span>
              </div>
              <div className="metadata-info flex gap-2 relative">
                <span>Episode Length:</span>
                {info.detail.episode_run_time?.length ? (
                  <span className="text-zinc-400">
                    {info.detail.episode_run_time[0]}min
                  </span>
                ) : (
                  <span className="text-zinc-400">No Information</span>
                )}
              </div>
            </div>
            <div className="metadata-wrapper font-semibold flex gap-2 border-b-[0.1px] border-b-zinc-600 py-4 relative">
              <span className="text-nowrap">Other Name:</span>
              <span className="text-zinc-400">
                {(() => {
                  const originalNames = [
                    info.detail.original_name,
                    info.detail.original_title,
                  ].filter(Boolean);
                  return originalNames.length > 0
                    ? originalNames.join(", ")
                    : "No Information";
                })()}
              </span>
            </div>
          </div>
          <Link
            to={`/tv/details/${id}/watch`}
            className="poster-trailer-btn py-1 px-2 xl:py-2 xl:px-6 rounded-lg text-zinc-100 font-semibold lg:text-lg bg-blue-500 uppercase mx-auto lg:mx-0 w-max mt-6 relative"
          >
            <i className="ri-play-large-fill"></i> Watch Trailer
          </Link>
        </div>
        <Outlet />
      </div>

      <div className="other-stuff w-full min-h-screen text-lg px-2 relative">
        <div className="tv-related-metadata w-full h-full relative">
          <div className="metadata-wrapper font-semibold flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-8 border-b-[0.1px] border-b-zinc-600 py-4 text-nowrap relative">
            <div className="metadata-info flex gap-2 border-b-[0.1px] border-b-zinc-600 md:border-0 pb-1 md:pb-0 relative">
              <span>Number of Seasons:</span>
              <span className="text-zinc-400">
                {info.detail.number_of_seasons || "No Information"}
              </span>
            </div>
            <div className="metadata-info flex gap-2 border-b-[0.1px] border-b-zinc-600 md:border-0 pb-1 md:pb-0 relative">
              <span>Total Episode:</span>
              <span className="text-zinc-400">
                {info.detail.number_of_episodes || "No Information"}
              </span>
            </div>
            <div className="metadata-info flex gap-2 border-b-[0.1px] border-b-zinc-600 md:border-0 pb-1 md:pb-0 relative">
              <span>First Air Date:</span>
              <span className="text-zinc-400">
                {info.detail.first_air_date || "No Information"}
              </span>
            </div>
            <div className="metadata-info flex gap-2 border-b-[0.1px] border-b-zinc-600 md:border-0 pb-1 md:pb-0 relative">
              <span>Last Air Date:</span>
              <span className="text-zinc-400">
                {info.detail.last_air_date || "No Information"}
              </span>
            </div>
          </div>
        </div>

        <div className="tv-season-slide w-full relative pt-10 pb-5">
          <div className="tv-slide-wrapper w-[90%] mx-auto">
            <h3 className="font-semibold text-4xl text-nowrap pl-3 pb-3">
              Seasons
            </h3>
            {info.detail.seasons?.length > 0 ? (
              <TvSlider
                data={info.detail.seasons}
                src={"https://image.tmdb.org/t/p/original/"}
                type="season"
              />
            ) : (
              <span className="text-zinc-400">No Information</span>
            )}
          </div>
        </div>

        <div className="tv-metadata w-full h-full relative flex flex-col lg:flex-row">
          <div className="tv-credits-metadata w-full h-full lg:w-1/2 my-6 flex flex-col gap-8 items-center relative">
            <div className="tv-crew-metadata">
              {
                <div className="flex gap-2 border-b border-zinc-600 py-3 relative">
                  <span className="font-semibold">Director:</span>
                  <span className="text-zinc-400 text-">
                    {info.credits.crew
                      .filter((c) => c.job === "Director")
                      .map((c) => c.name)
                      .join(", ") || "No Information"}
                  </span>
                </div>
              }

              {
                <div className="flex gap-2 border-b border-zinc-600 py-3 relative">
                  <span className="font-semibold">Writer:</span>
                  <span className="text-zinc-400 text-">
                    {info.credits.crew
                      .filter((c) => c.job === "Screenplay")
                      .map((c) => c.name)
                      .join(", ") || "No Information"}
                  </span>
                </div>
              }

              {
                <div className="flex gap-2 border-b border-zinc-600 py-3 relative">
                  <span className="font-semibold">Producer:</span>
                  <span className="text-zinc-400 text-">
                    {info.credits.crew
                      .filter((c) => c.job === "Producer")
                      .map((c) => c.name)
                      .join(", ") || "No Information"}
                  </span>
                </div>
              }
            </div>

            <div className="tv-production-company w-fit flex flex-col gap-3 items-center bg-zinc-100 text-zinc-800 rounded-lg overflow-hidden relative">
              <h1 className="text-2xl font-semibold border-b border-zinc-600">
                Production Company
              </h1>
              {info.detail.production_companies?.length > 0 ? (
                info.detail.production_companies?.map((pc, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full grid grid-cols-2 gap-4 relative border-b border-zinc-800 p-2"
                    >
                      <img
                        className="h-10 block bg-cover bg-center bg-no-repeat"
                        src={`https://image.tmdb.org/t/p/original/${pc.logo_path}`}
                        alt={pc.name}
                      />
                      <span className="text-lg font-semibold place-self-center">
                        {pc.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <span className="text-center text-zinc-600">
                  No Information
                </span>
              )}
            </div>
          </div>

          <div className="tv-platform w-full h-full lg:w-1/2 flex flex-col items-center py-6 relative">
            <div className="w-fit flex flex-col gap-6 p-6 shadow-xl shadow-zinc-400">
              <div className="tv-available-platform">
                <span className="font-semibold text-lg">
                  Available to Watch
                </span>
                <div className="flex gap-5 mt-2">
                  {info.watchProviders &&
                  info.watchProviders.flatrate &&
                  info.watchProviders.flatrate.length > 0 ? (
                    info.watchProviders.flatrate.map((f, i) => {
                      return (
                        <img
                          key={i}
                          className="h-10 block rounded-lg bg-cover bg-center bg-no-repeat"
                          src={`https://image.tmdb.org/t/p/original/${f.logo_path}`}
                          alt={f.provider_name}
                        />
                      );
                    })
                  ) : (
                    <span className="text-zinc-500">No Information</span>
                  )}
                </div>
              </div>

              <div className="tv-buy-platform">
                <span className="font-semibold text-lg">Available to Buy</span>
                <div className="flex gap-5 mt-2">
                  {info.watchProviders &&
                  info.watchProviders.buy &&
                  info.watchProviders.buy.length > 0 ? (
                    info.watchProviders.buy.map((b, i) => {
                      return (
                        <img
                          key={i}
                          className="h-10 block rounded-lg bg-cover bg-center bg-no-repeat"
                          src={`https://image.tmdb.org/t/p/original/${b.logo_path}`}
                          alt={b.provider_name}
                        />
                      );
                    })
                  ) : (
                    <span className="text-zinc-500">No Information</span>
                  )}
                </div>
              </div>

              <div className="tv-rent-platform">
                <span className="font-semibold text-lg">Available to Rent</span>
                <div className="flex gap-5 mt-2">
                  {info.watchProviders &&
                  info.watchProviders.rent &&
                  info.watchProviders.rent.length > 0 ? (
                    info.watchProviders &&
                    info.watchProviders.rent &&
                    info.watchProviders.rent.map((r, i) => {
                      return (
                        <img
                          key={i}
                          className="h-10 block rounded-lg bg-cover bg-center bg-no-repeat"
                          src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                          alt={r.provider_name}
                        />
                      );
                    })
                  ) : (
                    <span className="text-zinc-500">No Information</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tv-slider w-full flex flex-col items-center py-10 gap-10 relative">
          <div className="tv-slide-wrapper w-[90%]">
            <h3 className="font-semibold text-4xl text-nowrap pl-3 pb-3">
              Photos
            </h3>
            {info.images?.length > 0 ? (
              <TvSlider
                data={info.images}
                src={"https://image.tmdb.org/t/p/original/"}
                type="image"
              />
            ) : (
              <span className="text-zinc-400">No Information</span>
            )}
          </div>
          <div className="tv-slide-wrapper w-[90%]">
            <h3 className="font-semibold text-4xl text-nowrap pl-3 pb-3">
              Official Videos
            </h3>
            {info.videos?.length > 0 ? (
              <TvSlider data={info.videos} type="video" />
            ) : (
              <span className="text-zinc-400">No Information</span>
            )}
          </div>
        </div>

        <div className="tv-cast w-full relative">
          <div className="w-full md:w-[80%] mx-auto pb-5 relative">
            <h3 className="text-4xl font-semibold text-nowrap pb-10 pl-2">
              Top Cast
            </h3>
            <div className="top-cast w-full h-[30vh] lg:h-auto overflow-x-auto lg:overflow-x-visible flex lg:grid grid-cols- lg:grid-cols-3 gap-5 justify-items-cen lg:justify-items-start bg-zinc-60 relative">
              {info.credits.cast?.length ? (
                info.credits.cast.slice(0, 18).map((c, i) => {
                  return (
                    <Link
                      to={`/person/details/${c.id}`}
                      key={i}
                      className="cast-profile-wrapper w-fit h-fit flex flex-col lg:flex-row items-center gap-6 relative"
                    >
                      <div className="cast-image w-24 h-24 rounded-full bg-zinc-400 overflow-hidden relative">
                        <img
                          className="w-full h-auto block bg-cover bg-center bg-no-repeat"
                          src={
                            c.profile_path
                              ? `https://image.tmdb.org/t/p/original${c.profile_path}`
                              : noimage
                          }
                          alt={c.name || c.original_name}
                        />
                      </div>
                      <div className="cast-name w-fit h-fit flex flex-col relative">
                        <span className="text-nowrap text-center lg:text-start">
                          {c.name || c.original_name || "No Information"}
                        </span>
                        <span className="text-zinc-400 text-center lg:text-start text-xs xs:text-sm sm:text-base line-clamp-1 lg:line-clamp-2">
                          {c.character || "No Information"}
                        </span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <span className="text-center text-zinc-400">
                  No Information
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="tv-related-stuff w-full h-full pb-10 relative">
        <div className="tv-recommendation w-[95%] h-full mx-auto">
          <ContentTitle title="Recommendations" toggleSwitchCount={0} />

          <div className="recommended-tv-wrapper w-full h-full relative">
            {info.recommendations?.length ? (
              <Content
                cardData={info.recommendations.slice(0, 14)}
                title="tv"
              />
            ) : (
              <span className="text-zinc-400">No Information</span>
            )}
          </div>
        </div>

        <div className="tv-similar w-[95%] h-full mx-auto">
          <ContentTitle title="Similar Shows" toggleSwitchCount={0} />

          <div className="similar-tv-wrapper w-full h-full relative">
            {info.similar?.length ? (
              <Content cardData={info.similar.slice(0, 14)} title="tv" />
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

export default TvDetails;
