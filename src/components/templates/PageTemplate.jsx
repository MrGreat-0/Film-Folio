import React from "react";
import Content from "./Content";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentLoader from "../Loading/ContentLoader";
import ScrollLoader from "../Loading/ScrollLoader";

const PageTemplate = ({
  title,
  switchData,
  setToggle,
  cardData,
  length,
  fetchData,
  hasMore,
  toggleSwitchCount,
  loading,
}) => {
  return (
    <div className="w-full min-h-screen relative">
      {loading ? (
        <ContentLoader />
      ) : (
        <InfiniteScroll
          dataLength={length}
          next={fetchData}
          hasMore={hasMore}
          loader={<ScrollLoader />}
          endMessage={
            <p style={{ textAlign: "center", color: "#f4f4f5" }}>
              You have seen it all!
            </p>
          }
        >
          <Content
            title={title}
            switchData={switchData}
            setToggle={setToggle}
            cardData={cardData}
            toggleSwitchCount={toggleSwitchCount}
          />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default PageTemplate;
