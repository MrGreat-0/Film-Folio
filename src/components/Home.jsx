import React, { useEffect, useState } from "react";
import axios from "axios";
import Poster from "./Poster";
import Content from "./templates/Content";

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
  const [trendingToggle, setTrendingToggle] = useState("day");
  const [popularToggle, setPopularToggle] = useState("movie");
  const [topRatedToggle, setTopRatedToggle] = useState("movie");

  // for loading //
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);
  const [topRatedLoading, setTopRatedLoading] = useState(false);

  // poster function to call api for poster //
  const getPoster = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/tmdb/trending/all/day");
      if (data && data.results) {
        // console.log("Poster :- " , data.results.slice(0, 1));
        setPoster(data.results.slice(0, 5));
      } else {
        setPoster([]);
      }
    } catch (error) {
      console.log("Poster Error: ", error);
      setPoster([]);
    } finally {
      setLoading(false);
    }
  };

  // trending function to call api for trending //
  const getTrending = async () => {
    setTrendingLoading(true);
    try {
      const { data } = await axios.get(
        `/api/tmdb/trending/all/${trendingToggle}`
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
      const { data } = await axios.get(`/api/tmdb/${popularToggle}/popular`);
      if (data && data.results) {
        // console.log("Popular :- " , data.results.slice(0, 1));
        setPopular(data.results.slice(0,10));
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
      const { data } = await axios.get(`/api/tmdb/${topRatedToggle}/top_rated`);
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

  useEffect(() => {
    !poster.length && getPoster();
    getTrending();
    getPopular();
    getTopRated();
  }, [poster, trendingToggle, popularToggle, topRatedToggle]);

  const switchData = [
    { switchOne: "Today", switchTwo: "Week" },
    { switchOne: "Movies", switchTwo: "TV Shows" },
  ];

  return loading ? (
    <div className="text-6xl text-zinc-100 text-center">Loading...</div>
  ) : (
    <>
      <div className="w-full h-full pt-8">
        <Poster poster={poster} />
      </div>
      <Content
        title="trending"
        switchData={switchData[0]}
        setToggle={setTrendingToggle}
        cardData={trending}
      />

      <Content
        title="what's popular"
        switchData={switchData[1]}
        setToggle={setPopularToggle}
        cardData={popular}
      />

      <Content
        title="top rated"
        switchData={switchData[1]}
        setToggle={setTopRatedToggle}
        cardData={topRated}
      />
    </>
  );
};

export default Home;
