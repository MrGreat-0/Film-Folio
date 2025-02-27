import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Nav = () => {
  // nav-menu-dropdown-state - To control dropdown visibility //
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // nav-menu-ref attach to menu
  const dropdownMenuRef = useRef(null);

  // nav-options data for Movies //
  const movieNavigation = [
    { name: "Popular", endpoint: "/movie/popular" },
    { name: "Upcoming", endpoint: "/movie/upcoming" },
    { name: "Top Rated", endpoint: "/movie/top-rated" },
    { name: "Now Playing", endpoint: "/movie/now-playing" },
  ];

  // nav-options data for TV Shows //
  const tvShowNavigation = [
    { name: "Popular", endpoint: "/tv/popular" },
    { name: "Airing Today", endpoint: "/tv/airing-today" },
    { name: "Top Rated", endpoint: "/tv/top-rated" },
    { name: "On The Air", endpoint: "/tv/on-the-air" },
  ];

  // nav-options data for People //
  const peopleNavigation = [{ name: "Popular", endpoint: "/person/popular" }];

  // nav-options data for More //
  const moreNavigation = [
    { name: "About", endpoint: "/about" },
    { name: "Contact", endpoint: "/contact" },
  ];

  // Function to format category names to URL slugs //
  const formatToSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-"); // Convert spaces to hyphens and lowercase
  };

  // Function to toggle the menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutsideMenu = (event) => {
    if (
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  const [isBarOpen, setIsBarOpen] = useState(false);
  const barRef = useRef(null);
  const handleSearchBar = () => {
    setIsBarOpen(true);
  };

  const handleClickOutsideBar = (event) => {
    if (barRef.current && !barRef.current.contains(event.target)) {
      setIsBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideBar);
    return () => {
      document.removeEventListener("click", handleClickOutsideBar);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  // function for nav-options to provide structure and event listener like handleMouseOver, handleMouseOut, handleClick, handleClickOutside //
  const OptionDropdown = ({ title, options }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleMouseOver = () => {
      setIsDropdownOpen(true);
    };

    const handleMouseOut = () => {
      setIsDropdownOpen(false);
    };

    const handleClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMenuClose = () => {
      setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
    return (
      <div
        className="relative cursor-pointer pb-2 pr-2"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={dropdownRef}
      >
        <h3 className="text-sm font-semibold" onClick={handleClick}>
          {title}
        </h3>

        {/* nav-movies-dropdown */}
        {isDropdownOpen && (
          <div
            className={`${formatToSlug(
              title
            )}-dropDown w-fit h-fit absolute bg-zinc-900 top-7 left-0 flex flex-col py-1 whitespace-nowrap rounded-b-md overflow-hidden`}
          >
            {options.map((option, i) => {
              return (
                <Link
                  key={i}
                  className="text-zinc-400 text-sm hover:bg-zinc-800 pl-3 pr-8 py-2"
                  to={`${option.endpoint}`}
                  onClick={handleMenuClose}
                >
                  {option.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // function for nav-menu to provide structure and event listener like handleMouseOver, handleMouseOut, handleClick, handleClickOutside //
  const MenuDropdown = ({ title, options }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleMenuClose = () => {
      setIsMenuOpen(false);
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    return (
      <div ref={dropdownRef} className="relative py-1 cursor-pointer">
        <div className="title flex items-center relative">
          <h3 className="font-semibold whitespace-nowrap" onClick={handleClick}>
            {title}
          </h3>
          {isDropdownOpen ? (
            <i className="ri-arrow-drop-up-fill pt-1 text-lg"></i>
          ) : (
            <i className="ri-arrow-drop-down-fill pt-1 text-lg"></i>
          )}
        </div>
        {isDropdownOpen && (
          <div
            className={`${formatToSlug(
              title
            )}-dropDown w-fit h-fit flex flex-col pt-1 whitespace-nowrap `}
          >
            {options.map((option, i) => {
              return (
                <Link
                  key={i}
                  className="text-zinc-400 text-sm hover:bg-zinc-800 py-[2px]"
                  to={`${option.endpoint}`}
                  onClick={handleMenuClose}
                >
                  {option.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  // Update innerWidth on window resize
  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-full h-[9vh] bg-zinc-900 px-2 flex items-center justify-between xl:justify-evenly text-white sticky top-0 left-0 z-50">
      <div className="w-auto h-12 flex gap-2 items-center relative">
        {/* nav-hamburger-menu for mobile */}
        <div ref={dropdownMenuRef} className="menu md:hidden relative">
          <i
            className="ri-menu-fill text-2xl cursor-pointer"
            onClick={handleMenuToggle}
          ></i>
          {isMenuOpen && (
            <div className="menu-wrapper absolute bg-zinc-950 top-11 left-0 h-auto w-28 pl-4 rounded-b-md">
              <MenuDropdown title="Movies" options={movieNavigation} />
              <MenuDropdown title="TV Shows" options={tvShowNavigation} />
              <MenuDropdown title="People" options={peopleNavigation} />
              <MenuDropdown title="More" options={moreNavigation} />
            </div>
          )}
        </div>

        {/* nav-logo */}
        <Link
          to={"/"}
          className="logo h-8 min-w-[7rem] sm:h-10 sm:ml-6 sm:mr-10 xl:m-0 relative"
        >
          <img
            className="w-full h-full object-contain"
            src="/FilmFolio-full-logo.svg"
            alt="logo"
            loading="lazy"
          />
        </Link>
      </div>

      {/* nav-search for desktop */}
      {innerWidth > 1279 && (
        <SearchBar
          containerStyle={"w-2/5 hidden xl:flex relative"}
          messageStyle={"flex"}
        />
      )}

      {/* nav-options */}
      <div className="nav-options relative hidden md:flex md:gap-6 md:ml-auto lg:ml-0 lg:mr-auto xl:mr-0">
        <OptionDropdown title="Movies" options={movieNavigation} />
        <OptionDropdown title="TV Shows" options={tvShowNavigation} />
        <OptionDropdown title="People" options={peopleNavigation} />
        <OptionDropdown title="More" options={moreNavigation} />
      </div>

      {/* nav-sign in & search icon for mobile-responsive */}
      <div className="nav-right max-w-fit flex items-center relative">
        <div className="w-full relative" ref={barRef}>
          <i
            onClick={handleSearchBar}
            className=" ri-search-line text-2xl text-zinc-400 xl:hidden mx-6 hover:text-zinc-300 ease-in-out duration-300 cursor-pointer"
          ></i>

          {isBarOpen && innerWidth < 1280 && (
            <SearchBar
              containerStyle={
                "w-screen absolute top-[6.5vh] -right-full md:top-0 md:right-4 md:w-[34vw] lg:w- flex xl:hidden"
              }
              messageStyle={"hidden lg:flex"}
              innerWidth={innerWidth}
            />
          )}
        </div>

        <Link
          to="/auth"
          className="whitespace-nowrap bg-blue-600 text-sm md:text-base px-3 py-1 rounded"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
