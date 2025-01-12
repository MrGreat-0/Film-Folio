import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PosterLoader = () => {
  return (
    <div className="w-full h-[70vw] md:h-[60vh] relative">
      <Skeleton
        width="100%"
        height="100%"
        baseColor="#27272a"
        highlightColor="#4a4a4a"
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
};

export default PosterLoader;
