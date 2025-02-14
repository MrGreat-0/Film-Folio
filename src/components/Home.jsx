import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Poster from "./Poster";
import Content from "./templates/Content";
import PosterLoader from "./Loading/PosterLoader";
import ContentLoader from "./Loading/ContentLoader";
import ContentTitle from "./templates/ContentTitle";
import ContentTitleLoader from "./Loading/ContentTitleLoader";

const Home = () => {
  // for poster
  const [poster, setPoster] = useState([]);
  // for trending
  const [trending, setTrending] = useState([]);
  // for popular
  const [popular, setPopular] = useState([]);
  // for top-rated
  const [topRated, setTopRated] = useState([]);

  // Toggle states for each content section
  const [trendingToggleTime, setTrendingToggleTime] = useState("day");
  const [trendingToggleType, setTrendingToggleType] = useState("movie");
  const [popularToggleType, setPopularToggleType] = useState("movie");
  const [topRatedToggleType, setTopRatedToggleType] = useState("movie");
  const [toggleSwitchCount, setToggleSwitchCount] = useState(1);

  // for loading
  const [posterLoading, setPosterLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);
  const [topRatedLoading, setTopRatedLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // poster function to call api for poster //
  const getPoster = async () => {
    setPosterLoading(true);
    try {
      const { data } = await axios.get("/trending/all/day");
      if (data && data.results) {
        // console.log("Poster :- " , data.results.slice(0, 1));
        setPoster(data.results.slice(0, 5));
      } else {
        setPoster([]);
      }
    } catch (error) {
      // console.log("Poster Error: ", error);
      setPoster([]);
    } finally {
      setPosterLoading(false);
      setInitialLoading(false);
    }
  };

  // trending function to call api for trending //
  const getTrending = async () => {
    setTrendingLoading(true);
    try {
      const { data } = await axios.get(
        `/trending/${trendingToggleType}/${trendingToggleTime}`
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
      const { data } = await axios.get(`/${popularToggleType}/popular`);
      if (data && data.results) {
        // console.log("Popular :- " , data.results.slice(0, 1));
        setPopular(data.results.slice(0, 10));
      } else {
        setPopular([]);
      }
    } catch (error) {
      // console.log("Popular Error: ", error);
      setPopular([]);
    } finally {
      setPopularLoading(false);
    }
  };

  // top-rated function to call api for top-rated //
  const getTopRated = async () => {
    setTopRatedLoading(true);
    try {
      const { data } = await axios.get(`/${topRatedToggleType}/top_rated`);
      if (data && data.results) {
        // console.log("Top-Rated :- ", data.results.slice(0, 1));
        setTopRated(data.results.slice(0, 12));
      } else {
        setTopRated([]);
      }
    } catch (error) {
      // console.log("Top-Rated Error: ", error);
      setTopRated([]);
    } finally {
      setTopRatedLoading(false);
    }
  };

  useEffect(() => {
    !poster.length && getPoster();
  }, []);

  useEffect(() => {
    getTrending();
  }, [trendingToggleTime, trendingToggleType]);

  useEffect(() => {
    getPopular();
  }, [popularToggleType]);

  useEffect(() => {
    getTopRated();
  }, [topRatedToggleType]);

  const switchData = [
    { switchOne: "Today", switchTwo: "Week" },
    { switchOne: "Movies", switchTwo: "TV Shows" },
  ];

  return (
    <div className="w-full min-h-[91vh] pt-8">
      {posterLoading ? <PosterLoader /> : <Poster poster={poster} />}

      {/* trending-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle
          title="trending"
          switchData={switchData}
          setToggleTime={setTrendingToggleTime}
          setToggleType={setTrendingToggleType}
          toggleSwitchCount={2}
        />
      )}
      {trendingLoading ? (
        <ContentLoader />
      ) : (
        <Content cardData={trending} title={trendingToggleType} />
      )}

      {/* popular-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle
          title="what's popular"
          switchData={switchData[1]}
          setToggleType={setPopularToggleType}
          setToggleTime={null}
          toggleSwitchCount={toggleSwitchCount}
        />
      )}
      {popularLoading ? (
        <ContentLoader />
      ) : (
        <Content cardData={popular} title={popularToggleType} />
      )}

      {/* top-rated-content */}
      <div className="top-rated pb-10 relative">
        {initialLoading ? (
          <ContentTitleLoader />
        ) : (
          <ContentTitle
            title="top rated"
            switchData={switchData[1]}
            setToggleType={setTopRatedToggleType}
            setToggleTime={null}
            toggleSwitchCount={toggleSwitchCount}
          />
        )}
        {topRatedLoading ? (
          <ContentLoader />
        ) : (
          <Content cardData={topRated} title={topRatedToggleType} />
        )}
      </div>
    </div>
  );
};

export default Home;
