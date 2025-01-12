import React from "react";
import Content from "./Content";
import InfiniteScroll from "react-infinite-scroll-component";

const PageTemplate = ({
  title,
  switchData,
  setToggle,
  cardData,
  length,
  fetchData,
  hasMore,
  toggleSwitchCount,
}) => {
  return (
    <div className="w-full min-h-screen relative">
      <InfiniteScroll
        dataLength={length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>} // Loader component
        endMessage={
          <p style={{ textAlign: "center" }}>You have seen it all!</p>
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
    </div>
  );
};

export default PageTemplate;
