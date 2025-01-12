import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Movie from "../components/Movie";
import SubMenu from "../components/SubMenu";
import TvShow from "../components/TvShow";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TvShow />} />
        <Route path="/:category/:type" element={<SubMenu />} />
      </Routes>
    </div>
  );
};

export default Routing;
