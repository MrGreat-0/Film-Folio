import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Content from "./templates/Content";
import ContentLoader from "./Loading/ContentLoader";
import ContentTitle from "./templates/ContentTitle";
import ContentTitleLoader from "./Loading/ContentTitleLoader";

const TvShow = () => {
  // for trending
  const [trending, setTrending] = useState([]);
  // for popular
  const [popular, setPopular] = useState([]);
  // for top-rated
  const [topRated, setTopRated] = useState([]);
  // for airing-today
  const [airingToaday, setAiringToaday] = useState([]);
  // for now-playing
  const [onTheAir, setOnTheAir] = useState([]);

  // Toggle states for each content section
  const [trendingToggleTime, setTrendingToggleTime] = useState("day");
  const [toggleSwitchCount, setToggleSwitchCount] = useState(1);

  // for loading //
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);
  const [topRatedLoading, setTopRatedLoading] = useState(false);
  const [airingToadayLoading, setAiringToadayLoading] = useState(false);
  const [onTheAirLoading, setOnTheAirLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // trending function to call api for trending //
  const getTrending = async () => {
    setTrendingLoading(true);
    try {
      const { data } = await axios.get(`/trending/tv/${trendingToggleTime}`);
      if (data && data.results) {
        // console.log("Trending :- ", data.results.slice(0, 1));
        setTrending(data.results.slice(0, 13));
      } else {
        setTrending([]);
      }
    } catch (error) {
      console.log("Trending Error: ", error);
      setTrending([]);
    } finally {
      setTrendingLoading(false);
    }
  };

  // popular function to call api for popular //
  const getPopular = async () => {
    setPopularLoading(true);
    try {
      const { data } = await axios.get(`/tv/popular`);
      if (data && data.results) {
        // console.log("Popular :- " , data.results.slice(0, 1));
        setPopular(data.results.slice(0, 11));
      } else {
        setPopular([]);
      }
    } catch (error) {
      console.log("Popular Error: ", error);
      setPopular([]);
    } finally {
      setPopularLoading(false);
      setInitialLoading(false);
    }
  };

  // top-rated function to call api for top-rated //
  const getTopRated = async () => {
    setTopRatedLoading(true);
    try {
      const { data } = await axios.get(`/tv/top_rated`);
      if (data && data.results) {
        // console.log("Top-Rated :- ", data.results.slice(0, 1));
        setTopRated(data.results.slice(0, 12));
      } else {
        setTopRated([]);
      }
    } catch (error) {
      console.log("Top-Rated Error: ", error);
      setTopRated([]);
    } finally {
      setTopRatedLoading(false);
    }
  };

  // airing-today function to call api for airing-today //
  const getAiringToday = async () => {
    setAiringToadayLoading(true);
    try {
      const { data } = await axios.get(`/tv/airing_today`);
      if (data && data.results) {
        // console.log("Airing-Today :- ", data.results.slice(0, 1));
        setAiringToaday(data.results.slice(0, 11));
      } else {
        setAiringToaday([]);
      }
    } catch (error) {
      console.log("Airing-Toaday Error: ", error);
      setAiringToaday([]);
    } finally {
      setAiringToadayLoading(false);
    }
  };

  // on-the-air function to call api for on-the-air //
  const getOnTheAir = async () => {
    setOnTheAirLoading(true);
    try {
      const { data } = await axios.get(`/tv/on_the_air`);
      if (data && data.results) {
        // console.log("On-The-Air :- ", data.results.slice(0, 1));
        setOnTheAir(data.results.slice(0, 13));
      } else {
        setOnTheAir([]);
      }
    } catch (error) {
      console.log("Now-Playing Error: ", error);
      setOnTheAir([]);
    } finally {
      setOnTheAirLoading(false);
    }
  };

  useEffect(() => {
    getPopular();
    getTopRated();
    getAiringToday();
    getOnTheAir();
  }, []);

  useEffect(() => {
    getTrending();
  }, [trendingToggleTime]);

  const switchData = [
    { switchOne: "Today", switchTwo: "Week" },
    { switchOne: "Movies", switchTwo: "TV Shows" },
  ];
  return (
    <div className="w-full min-h-[90vh] relative">
      {/* trending-content */}
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
      {trendingLoading ? <ContentLoader /> : <Content cardData={trending} />}

      {/* popular-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle title="what's popular" toggleSwitchCount={0} />
      )}
      {popularLoading ? <ContentLoader /> : <Content cardData={popular} />}

      {/* top-rated-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle title="top rated" toggleSwitchCount={0} />
      )}
      {topRatedLoading ? <ContentLoader /> : <Content cardData={topRated} />}

      {/* airing-today-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle title="airing today" toggleSwitchCount={0} />
      )}
      {airingToadayLoading ? (
        <ContentLoader />
      ) : (
        <Content cardData={airingToaday} />
      )}

      {/* on-the-air-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle title="on the air" toggleSwitchCount={0} />
      )}
      {onTheAirLoading ? <ContentLoader /> : <Content cardData={onTheAir} />}
    </div>
  );
};
export default TvShow;
