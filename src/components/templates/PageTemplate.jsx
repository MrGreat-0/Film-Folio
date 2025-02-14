import React from "react";
import Content from "./Content";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentLoader from "../Loading/ContentLoader";
import ContentTitle from "../templates/ContentTitle";
import TitleLoader from "../Loading/TitleLoader";

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
  oneTimeLoading,
  category,
  type,
}) => {
  return (
    <div className="w-full min-h-[91vh] relative">
      {type === "trending" ? (
        oneTimeLoading ? (
          <TitleLoader />
        ) : (
          <ContentTitle
            title={title}
            switchData={switchData}
            setToggleTime={setToggleTime}
            setToggleType={setToggleType}
            toggleSwitchCount={toggleSwitchCount}
          />
        )
      ) : loading ? (
        <TitleLoader />
      ) : (
        <ContentTitle
          title={title}
          switchData={switchData}
          setToggleTime={setToggleTime}
          setToggleType={setToggleType}
          toggleSwitchCount={toggleSwitchCount}
        />
      )}

      <div className="infinite-content-container pb-10 relative">
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
            <Content cardData={cardData} title={category} />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default PageTemplate;
