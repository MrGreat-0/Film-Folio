import React, { useEffect, useState } from "react";
import axios from "axios";
import Content from "./templates/Content";
import ContentLoader from "./Loading/ContentLoader";

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
  const [dataToggle, setDataToggle] = useState("day");
  const [toggleSwitchCount, setToggleSwitchCount] = useState(1);

  // for loading //
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);
  const [topRatedLoading, setTopRatedLoading] = useState(false);
  const [upcomingLoading, setUpcomingLoading] = useState(false);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(false);

  // trending function to call api for trending //
  const getTrending = async () => {
    setTrendingLoading(true);
    try {
      const { data } = await axios.get(
        `/api/tmdb/trending/movie/${dataToggle}`
      );
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
      const { data } = await axios.get(`/api/tmdb/movie/popular`);
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
    }
  };

  // top-rated function to call api for top-rated //
  const getTopRated = async () => {
    setTopRatedLoading(true);
    try {
      const { data } = await axios.get(`/api/tmdb/movie/top_rated`);
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

  // upcoming function to call api for upcoming //
  const getUpcoming = async () => {
    setUpcomingLoading(true);
    try {
      const { data } = await axios.get(`/api/tmdb/movie/upcoming`);
      if (data && data.results) {
        // console.log("Top-Rated :- ", data.results.slice(0, 1));
        setUpcoming(data.results.slice(0, 11));
      } else {
        setUpcoming([]);
      }
    } catch (error) {
      console.log("Upcoming Error: ", error);
      setUpcoming([]);
    } finally {
      setUpcomingLoading(false);
    }
  };

  // now-playing function to call api for now-playing //
  const getNowPlaying = async () => {
    setNowPlayingLoading(true);
    try {
      const { data } = await axios.get(`/api/tmdb/movie/now_playing`);
      if (data && data.results) {
        // console.log("Top-Rated :- ", data.results.slice(0, 1));
        setNowPlaying(data.results.slice(0, 13));
      } else {
        setNowPlaying([]);
      }
    } catch (error) {
      console.log("Now-Playing Error: ", error);
      setNowPlaying([]);
    } finally {
      setNowPlayingLoading(false);
    }
  };

  useEffect(() => {
    getTrending();
    getPopular();
    getTopRated();
    getUpcoming();
    getNowPlaying();
  }, [dataToggle]);

  const switchData = [
    { switchOne: "Today", switchTwo: "Week" },
    { switchOne: "Movies", switchTwo: "TV Shows" },
  ];
  return (
    <div className="w-full min-h-screen relative">
      {trendingLoading ? (
        <ContentLoader />
      ) : (
        <Content
          title="trending"
          switchData={switchData[0]}
          setToggle={setDataToggle}
          cardData={trending}
          toggleSwitchCount={toggleSwitchCount}
        />
      )}

      {popularLoading ? (
        <ContentLoader />
      ) : (
        <Content
          title="what's popular"
          cardData={popular}
          toggleSwitchCount={0}
        />
      )}

      {topRatedLoading ? (
        <ContentLoader />
      ) : (
        <Content title="top rated" cardData={topRated} toggleSwitchCount={0} />
      )}
      {upcomingLoading ? (
        <ContentLoader />
      ) : (
        <Content title="upcoming" cardData={upcoming} toggleSwitchCount={0} />
      )}
      {nowPlayingLoading ? (
        <ContentLoader />
      ) : (
        <Content
          title="now playing"
          cardData={nowPlaying}
          toggleSwitchCount={0}
        />
      )}
    </div>
  );
};

export default Movie;
