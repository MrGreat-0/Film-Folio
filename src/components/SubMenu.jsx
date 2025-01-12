import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PageTemplate from "./templates/PageTemplate";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

const SubMenu = () => {
  const { category, type } = useParams();

  // for data
  const [data, setData] = useState([]);

  // Toggle states for each content section
  const [dataToggle, setDataToggle] = useState("day");
  const [toggleSwitchCount, setToggleSwitchCount] = useState(1);

  // for loading
  const [loading, setLoading] = useState(false);

  // for infinite scroll
  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);

  // data function to call api for data //
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = "";
      if (category === "movie") {
        if (type === "popular") {
          endpoint = "/movie/popular";
        } else if (type === "upcoming") {
          endpoint = "/movie/upcoming";
        } else if (type === "top-rated") {
          endpoint = "/movie/top_rated";
        } else if (type === "now-playing") {
          endpoint = "/movie/now_playing";
        } else if (type === "trending") {
          endpoint = `/trending/movie/${dataToggle}`;
          setToggleSwitchCount(1);
        }
      } else if (category === "tv") {
        if (type === "popular") {
          endpoint = "/tv/popular";
        } else if (type === "airing-today") {
          endpoint = "/tv/airing_today";
        } else if (type === "top-rated") {
          endpoint = "/tv/top_rated";
        } else if (type === "on-the-air") {
          endpoint = "/tv/on_the_air";
        } else if (type === "trending") {
          endpoint = `/trending/tv/${dataToggle}`;
          setToggleSwitchCount(1);
        }
      } else if (category === "person") {
        if (type === "popular") {
          endpoint = "/person/popular";
        } else if (type === "trending") {
          endpoint = `/trending/person/${dataToggle}`;
          setToggleSwitchCount(1);
        }
      }

      const { data } = await axios.get(
        `/api/tmdb/${endpoint}?page=${pageRef.current}`
      );

      if (data && data.results && data.results.length > 0) {
        // console.log("data :- ", data.results.slice(0, 1));
        setData((prevState) => [...prevState, ...data.results]);
        pageRef.current += 1;
        setHasMore(data.results.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Data Error: ", error);
      setHasMore(false);
      setData([]);
    } finally {
      setLoading(false);
    }
  });

  const refreshHandler = async () => {
    if (data.length === 0) {
      getData();
    } else {
      pageRef.current = 1;
      setHasMore(true);
      setData([]);
      getData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, type, dataToggle]);

  const switchData = [
    { switchOne: "Today", switchTwo: "Week" },
    { switchOne: "Movies", switchTwo: "TV Shows" },
  ];

  return (
    <div>
      <PageTemplate
        title={`${category} - ${type}`}
        switchData={type === "trending" ? switchData[0] : undefined}
        setToggle={type === "trending" ? setDataToggle : undefined}
        cardData={data}
        length={data.length}
        fetchData={getData}
        hasMore={hasMore}
        toggleSwitchCount={type === "trending" ? toggleSwitchCount : undefined}
      />
    </div>
  );
};

export default SubMenu;
