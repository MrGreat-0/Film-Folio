import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContentTitleLoader = () => {
  return (
    <div className="switch-wrapper flex flex-col xs:flex-row justify-between items-center shrink-0 gap-4 xs:gap-0 pt-8">
      {/* Title Skeleton */}
      <Skeleton
        width={200}
        height={40}
        baseColor="#27272a"
        highlightColor="#4a4a4a"
        style={{ borderRadius: "10px" }}
      />
      {/* Toggle Switch Skeleton */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Skeleton
          width={100}
          height={36}
          baseColor="#27272a"
          highlightColor="#4a4a4a"
          style={{ borderRadius: "18px" }}
        />
        <Skeleton
          width={100}
          height={36}
          baseColor="#27272a"
          highlightColor="#4a4a4a"
          style={{ borderRadius: "18px" }}
        />
      </div>
    </div>
  );
};

export default ContentTitleLoader;
