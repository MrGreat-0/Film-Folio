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
  const [trendingToggleTime, setTrendingToggleTime] = useState("day");
  const [toggleSwitchCount, setToggleSwitchCount] = useState(1);

  // for loading
  const [loading, setLoading] = useState(true);

  // for infinite scroll
  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);

  // data function to call api for data //
  const getData = useCallback(async () => {
    try {
      const endpoints = {
        movie: {
          popular: "/movie/popular",
          upcoming: "/movie/upcoming",
          "top-rated": "/movie/top_rated",
          "now-playing": "/movie/now_playing",
          trending: `/trending/movie/${trendingToggleTime}`,
        },
        tv: {
          popular: "/tv/popular",
          "airing-today": "/tv/airing_today",
          "top-rated": "/tv/top_rated",
          "on-the-air": "/tv/on_the_air",
          trending: `/trending/tv/${trendingToggleTime}`,
        },
        person: {
          popular: "/person/popular",
          trending: `/trending/person/${trendingToggleTime}`,
        },
      };

      const endpoint = endpoints[category]?.[type];
      if (!endpoint) {
        console.error("Invalid category or type");
        setHasMore(false);
        setData([]);
        return;
      }

      if (type === "trending") {
        setToggleSwitchCount(1);
      }

      const { data } = await axios.get(
        `/api/tmdb/${endpoint}?page=${pageRef.current}`
      );

      if (data?.results?.length) {
        setData((prevState) => [...prevState, ...data.results]);
        pageRef.current += 1;
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Data Error:", error);
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
      setLoading(true);
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, type, trendingToggleTime]);

  const switchData = [
    { switchOne: "Today", switchTwo: "Week" },
    { switchOne: "Movies", switchTwo: "TV Shows" },
  ];

  return (
    <div>
      <PageTemplate
        title={`${category} - ${type}`}
        switchData={type === "trending" ? switchData[0] : null}
        setToggleTime={type === "trending" ? setTrendingToggleTime : null}
        setToggleType={null}
        toggleSwitchCount={type === "trending" ? toggleSwitchCount : null}
        cardData={data}
        length={data.length}
        fetchData={getData}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
};

export default SubMenu;
