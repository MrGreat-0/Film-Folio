import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Content from "./templates/Content";
import ContentLoader from "./Loading/ContentLoader";
import ContentTitle from "./templates/ContentTitle";
import ContentTitleLoader from "./Loading/ContentTitleLoader";

const Movie = () => {
  // for trending
  const [trending, setTrending] = useState([]);
  // for popular
  const [popular, setPopular] = useState([]);
  // for top-rated
  const [topRated, setTopRated] = useState([]);
  // for upcoming
  const [upcoming, setUpcoming] = useState([]);
  // for now-playing
  const [nowPlaying, setNowPlaying] = useState([]);

  // Toggle states for each content section
  const [trendingToggleTime, setTrendingToggleTime] = useState("day");
  const [toggleSwitchCount, setToggleSwitchCount] = useState(1);

  // for loading
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);
  const [topRatedLoading, setTopRatedLoading] = useState(false);
  const [upcomingLoading, setUpcomingLoading] = useState(false);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // trending function to call api for trending //
  const getTrending = async () => {
    setTrendingLoading(true);
    try {
      const { data } = await axios.get(`/trending/movie/${trendingToggleTime}`);
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
      const { data } = await axios.get("/movie/popular");
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

  // top-rated function to call api for top-rated //
  const getTopRated = async () => {
    setTopRatedLoading(true);
    try {
      const { data } = await axios.get("/movie/top_rated");
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

  // upcoming function to call api for upcoming //
  const getUpcoming = async () => {
    setUpcomingLoading(true);
    try {
      const { data } = await axios.get("/movie/upcoming");
      if (data && data.results) {
        // console.log("Top-Rated :- ", data.results.slice(0, 1));
        setUpcoming(data.results.slice(0, 11));
      } else {
        setUpcoming([]);
      }
    } catch (error) {
      // console.log("Upcoming Error: ", error);
      setUpcoming([]);
    } finally {
      setUpcomingLoading(false);
    }
  };

  // now-playing function to call api for now-playing //
  const getNowPlaying = async () => {
    setNowPlayingLoading(true);
    try {
      const { data } = await axios.get("/movie/now_playing");
      if (data && data.results) {
        // console.log("Top-Rated :- ", data.results.slice(0, 1));
        setNowPlaying(data.results.slice(0, 13));
      } else {
        setNowPlaying([]);
      }
    } catch (error) {
      // console.log("Now-Playing Error: ", error);
      setNowPlaying([]);
    } finally {
      setNowPlayingLoading(false);
    }
  };

  useEffect(() => {
    getPopular();
    getTopRated();
    getUpcoming();
    getNowPlaying();
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
      {trendingLoading ? (
        <ContentLoader />
      ) : (
        <Content cardData={trending} title="movie" />
      )}

      {/* popular-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle title="what's popular" toggleSwitchCount={0} />
      )}
      {popularLoading ? (
        <ContentLoader />
      ) : (
        <Content cardData={popular} title="movie" />
      )}

      {/* top-rated-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle title="top rated" toggleSwitchCount={0} />
      )}
      {topRatedLoading ? (
        <ContentLoader />
      ) : (
        <Content cardData={topRated} title="movie" />
      )}

      {/* upcoming-content */}
      {initialLoading ? (
        <ContentTitleLoader />
      ) : (
        <ContentTitle title="upcoming" toggleSwitchCount={0} />
      )}
      {upcomingLoading ? (
        <ContentLoader />
      ) : (
        <Content cardData={upcoming} title="movie" />
      )}

      {/* now-playing-content */}
      <div className="now-playing pb-10 relative">
        {initialLoading ? (
          <ContentTitleLoader />
        ) : (
          <ContentTitle title="now playing" toggleSwitchCount={0} />
        )}

        {nowPlayingLoading ? (
          <ContentLoader />
        ) : (
          <Content cardData={nowPlaying} title="movie" />
        )}
      </div>
    </div>
  );
};

export default Movie;
