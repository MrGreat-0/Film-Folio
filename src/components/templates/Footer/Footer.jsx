import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer w-full min-h-[30vh] bg-zinc-900 flex justify-center items-center text-center sm:text-left sm:justify-start px-4 py-10 relative">
      <div className="footer-wrapper w-fit h-fit flex flex-col gap-2 relative">
        <Link to={"/"} className="logo mx-auto sm:mx-0 relative">
          <img
            className="h-11 object-contain"
            src="/FilmFolio-full-logo.svg"
            alt="logo"
            loading="lazy"
          />
        </Link>
        <div className="footer-page flex gap-4 text-base text-zinc-400 mx-auto sm:mx-0 relative">
          <Link to={"/"}>
            <span className="hover:text-zinc-100 transition duration-300">
              Home
            </span>
          </Link>
          <Link to={"/about"}>
            <span className="hover:text-zinc-100 transition duration-300">
              About
            </span>
          </Link>
          <Link to={"/contact"}>
            <span className="hover:text-zinc-100 transition duration-300">
              Contact
            </span>
          </Link>
        </div>
        <div className="footer-message flex flex-col gap-1 realtive">
          <span className="text-zinc-500 text-base">
            Copyright © film-folio-pi.vercel.app. All Rights Reserved
          </span>
          <p className="text-zinc-500 text-sm">
            This site does not store any files on its server. All content is
            provided by third-party services and is subject to their terms of
            use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
