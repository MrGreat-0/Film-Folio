import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TitleLoader = () => {
  return (
    <div className="switch-wrapper flex flex-col xs:flex-row justify-between items-center shrink-0 gap-4 xs:gap-0 pt-8 px-2">
      {/* Title Skeleton */}
      <Skeleton
        width={200}
        height={40}
        baseColor="#27272a"
        highlightColor="#4a4a4a"
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
};

export default TitleLoader;
