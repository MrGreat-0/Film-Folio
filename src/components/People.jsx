import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Content from "./templates/Content";
import ContentLoader from "./Loading/ContentLoader";
import ContentTitle from "./templates/ContentTitle";
import ContentTitleLoader from "./Loading/ContentTitleLoader";

const People = () => {
  // for trending
  const [trending, setTrending] = useState([]);
  // for popular
  const [popular, setPopular] = useState([]);

  // Toggle states for each content section
  const [trendingToggleTime, setTrendingToggleTime] = useState("day");
  const [toggleSwitchCount, setToggleSwitchCount] = useState(1);

  // for loading
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  // trending function to call api for trending //
  const getTrending = async () => {
    setTrendingLoading(true);
    try {
      const { data } = await axios.get(
        `/trending/person/${trendingToggleTime}`
      );
      if (data && data.results) {
        // console.log("Trending :- ", data.results.slice(0, 1));
        setTrending(data.results.slice(0, 13));
      } else {
        setTrending([]);
      }
    } catch (error) {
      // console.log("Trending Error: ", error);
      setTrending([]);
    } finally {
      setTrendingLoading(false);
    }
  };

  // popular function to call api for popular //
  const getPopular = async () => {
    setPopularLoading(true);
    try {
      const { data } = await axios.get("/person/popular");
      if (data && data.results) {
        // console.log("Popular :- " , data.results.slice(0, 1));
        setPopular(data.results.slice(0, 11));
      } else {
        setPopular([]);
      }
    } catch (error) {
      // console.log("Popular Error: ", error);
      setPopular([]);
    } finally {
      setPopularLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  useEffect(() => {
    getTrending();
  }, [trendingToggleTime]);

  const switchData = [
    { switchOne: "Today", switchTwo: "Week" },
    { switchOne: "Movies", switchTwo: "TV Shows" },
  ];
  return (
    <div className="w-full min-h-[91vh] relative">
      {/* trending-people */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle
          title="trending"
          switchData={switchData[0]}
          setToggleTime={setTrendingToggleTime}
          setToggleType={null}
          toggleSwitchCount={toggleSwitchCount}
        />
      )}
      {trendingLoading ? (
        <ContentLoader />
      ) : (
        <Content cardData={trending} title="person" />
      )}

      <div className="popular-people pb-10 relative">
        {/* popular-people */}
        {initialLoading ? (
          <ContentTitleLoader />
        ) : (
          <ContentTitle title="popular" toggleSwitchCount={0} />
        )}
        {popularLoading ? (
          <ContentLoader />
        ) : (
          <Content cardData={popular} title="person" />
        )}
      </div>
    </div>
  );
};

export default People;
