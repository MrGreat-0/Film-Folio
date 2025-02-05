import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import noimage from "/no-image.jpg";

const Slider = ({ data, type, id, category }) => {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setPreviewImage(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="slide w-full h-[32vh] bg-zinc-5 flex gap-6 self-center items-center px-2 select-none overflow-y-auto">
      {data.slice(0, 20).map((d, i) => {
        const imageUrl =
          d.file_path || d.backdrop_path || d.poster_path
            ? `https://image.tmdb.org/t/p/original/${
                d.file_path || d.backdrop_path || d.poster_path
              }`
            : noimage;

        return (
          <div
            key={i}
            className="h-[85%] md:h-[95%] bg-zinc-600 rounded-lg overflow-hidden flex flex-shrink-0"
          >
            {type === "image" ? (
              <img
                className="w-full h-full block bg-cover bg-center bg-no-repeat"
                src={imageUrl}
                alt="clip"
                loading="lazy"
                onClick={() => setPreviewImage(imageUrl)}
              />
            ) : type === "video" ? (
              <Link
                to={`/${category}/details/${id}/watch/${d.key}`}
                className="relative w-full h-full group"
              >
                <img
                  className="w-full h-full block bg-cover bg-center bg-no-repeat transition duration-300 lg:group-hover:brightness-50"
                  src={
                    d.key
                      ? `https://img.youtube.com/vi/${d.key}/mqdefault.jpg`
                      : noimage
                  }
                  alt={d.name}
                  loading="lazy"
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  {/* Play Button (Centered) */}
                  <i className="ri-play-large-fill text-white text-5xl cursor-pointer"></i>

                  {/* Name (Bottom-Aligned) */}
                  <h3
                    style={{ lineHeight: "1.1" }}
                    className="absolute bottom-2 left-0 text-white text-sm sm:text-base lg:text-lg font-semibold text-center w-full"
                  >
                    {d.name}
                  </h3>
                </div>
              </Link>
            ) : (
              <div className="season-slider-wrapper flex flex-col">
                <img
                  className="w-full h-full block bg-cover bg-center bg-no-repeat"
                  src={imageUrl}
                  alt={d.name}
                  loading="lazy"
                  onClick={() => setPreviewImage(imageUrl)}
                />
                <span className="text-center text-xs xs:text-sm font-semibold">
                  {d.name}
                </span>
              </div>
            )}
          </div>
        );
      })}

      {/* Fullscreen Image Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-w-full max-h-full rounded-lg shadow-lg"
            alt="Preview"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setPreviewImage(null)}
          >
            <i className="ri-close-line hover:text-zinc-400 text-base sm:text-lg md:text-xl block bg-zinc-900 px-1 rounded-full"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
