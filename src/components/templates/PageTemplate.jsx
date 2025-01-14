import React from "react";
import Content from "./Content";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentLoader from "../Loading/ContentLoader";
import ContentTitle from "../templates/ContentTitle";

const PageTemplate = ({
  title,
  switchData,
  setToggleTime,
  setToggleType,
  cardData,
  length,
  fetchData,
  hasMore,
  toggleSwitchCount,
  loading,
}) => {
  return (
    <div className="w-full min-h-screen relative">
      <ContentTitle
        title={title}
        switchData={switchData}
        setToggleTime={setToggleTime}
        setToggleType={setToggleType}
        toggleSwitchCount={toggleSwitchCount}
      />

      {loading ? (
        <ContentLoader />
      ) : (
        <InfiniteScroll
          dataLength={length}
          next={fetchData}
          hasMore={hasMore}
          loader={<ContentLoader />}
          endMessage={
            <p style={{ textAlign: "center", color: "#f4f4f5" }}>
              You have seen it all!
            </p>
          }
        >
          <Content cardData={cardData} />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default PageTemplate;
