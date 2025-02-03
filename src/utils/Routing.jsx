import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Movie from "../components/Movie";
import SubMenu from "../components/SubMenu";
import TvShow from "../components/TvShow";
import People from "../components/People";
import MovieDetails from "../components/MovieDetails";
import TvDetails from "../components/TvDetails";
import PersonDetails from "../components/PersonDetails";
import Trailer from "../components/Trailer";
import NotFound from "../components/NotFound";
import About from "../components/About";
import Contact from "../components/Contact";
import SignInSignUp from "../components/SignInSignUp";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TvShow />} />
        <Route path="/person" element={<People />} />
        <Route path="/:category/:type" element={<SubMenu />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="watch" element={<Trailer />} />
        </Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="watch" element={<Trailer />} />
        </Route>
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<SignInSignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Routing;
