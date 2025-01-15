import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContentLoader = () => {
  return (
    <section className="content-wrapper w-full min-h-[80vh] pt-2 px-2 relative">
      {/* Card Grid Skeleton */}
      <div className="w-full h-full pt-10 md:pt-14 lg:pt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 relative">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="card-wrapper flex flex-col aspect-[9/12]">
            <Skeleton
              className="w-full h-[28vh]"
              baseColor="#27272a"
              highlightColor="#4a4a4a"
              style={{ borderRadius: "10px" }}
            />
            <Skeleton
              className="w-full h-[2vh]"
              baseColor="#27272a"
              highlightColor="#4a4a4a"
              style={{ borderRadius: "10px", marginTop: "8px" }}
            />
            <Skeleton
              className="w-full h-[3vh]"
              baseColor="#27272a"
              highlightColor="#4a4a4a"
              style={{ borderRadius: "10px", marginTop: "8px" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentLoader;
