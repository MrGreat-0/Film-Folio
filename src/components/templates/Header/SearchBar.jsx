import React, { useEffect, useRef, useState } from "react";
import axios from "../../../utils/axios";
import { Link } from "react-router-dom";
import noimage from "/no-image.jpg";
import SearchBarLoader from "../../Loading/SearchBarLoader";

const SearchBar = ({ containerStyle, messageStyle }) => {
  // nav-search-input through onChange //
  const [query, setQuery] = useState("");

  // nav-search-dropdown //
  const [searches, setSearches] = useState([]);

  // nav-search-dropdown-state -  To control dropdown visibility //
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // for loading //
  const [loading, setLoading] = useState(false);

  // nav-search-dropdown-ref - Ref to the search input and dropdown container//
  const searchRef = useRef(null);

  // nav-search-input-shortcut-key-ref attach ref to input //
  const searchInputRef = useRef(null);

  // nav-search-dropdown function to call api for searches //
  const getSearches = async () => {
    setLoading(true);
    try {
      // Check if the query is empty or just whitespace
      if (!query.trim()) {
        setSearches([]); // Optionally clear the searches if the query is empty
        return;
      }
      const { data } = await axios.get("/search/multi", {
        params: {
          query: encodeURIComponent(query),
        },
      });

      if (data && data.results) {
        setSearches(data.results); // Update state if results exist
      } else {
        setSearches([]); // If results are missing, set an empty array
      }
    } catch (error) {
      console.log("Search Error: ", error);
      setSearches([]); // Set searches to empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  // nav-search function to set query //
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // nav-search-dropdown-function //
  const handleClickOutside = (e) => {
    // If the click is outside the search input or dropdown, close the dropdown
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  // nav-search function to close search-bar and set-query empty //
  const handleClick = () => {
    setIsDropdownOpen(false);
    setQuery("");
  };

  // nav-search-input-shortcut-key-function //
  const handleKeyDown = (event) => {
    if (
      (event.key === "s" || event.key === "S") &&
      document.activeElement !== searchInputRef.current
    ) {
      event.preventDefault();
      searchInputRef.current?.focus();
    } else if (event.key === "Escape" || event.key === "Esc") {
      setIsDropdownOpen(false);
      setQuery("");
      searchInputRef.current?.blur();
    }
  };

  // nav-searchIcon focus on input function //
  const handleSearchIcon = () => {
    searchInputRef.current?.focus();
  };

  // nav-search useEffect to call getSearches function //
  useEffect(() => {
    if (!query.trim()) {
      setSearches([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timeoutId = setTimeout(() => {
      getSearches();
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  // add event listener for keydown and clicks outside of the search input and dropdown //
  useEffect(() => {
    // Add event listener for clicks outside of the search input and dropdown
    document.addEventListener("mousedown", handleClickOutside);
    // Add the keydown event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={searchRef} // Attach ref to the entire search container
      className={`nav-search h-9 ${containerStyle} gap-4 items-center bg-neutral-800 rounded-md px-4`}
    >
      <i
        onClick={handleSearchIcon}
        className="ri-search-line text-xl text-zinc-400 hover:text-zinc-300 ease-in-out duration-200 cursor-pointer"
      ></i>
      <input
        onChange={handleInputChange}
        value={query}
        className="w-3/4 outline-none bg-transparent"
        type="text"
        placeholder="Search FilmFolio "
        onFocus={() => setIsDropdownOpen(true)} // Open the dropdown when input is focused
        ref={searchInputRef} // Attach ref to the nav-search-input
      />

      {/* nav-search-clear & nav-search-message*/}
      {query === "" ? (
        <div
          className={`input-message ${messageStyle} items-center gap-2 text-zinc-500 ml-auto pointer-events-none select-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27.47 26.875"
            fill="currentColor"
            id="icon-search-shortcut"
            width="20"
            height="20"
          >
            <path
              d="M1599.25,69.947h-15.1a6.165,6.165,0,0,0-6.18,6.14V90.66a6.165,6.165,0,0,0,6.18,6.14h15.1a6.165,6.165,0,0,0,6.18-6.14V76.086A6.165,6.165,0,0,0,1599.25,69.947Zm-19.45,6.14a4.339,4.339,0,0,1,4.35-4.32h15.1a4.339,4.339,0,0,1,4.35,4.32v10.74a4.339,4.339,0,0,1-4.35,4.32h-15.1a4.339,4.339,0,0,1-4.35-4.32V76.086Zm19.45,18.894h-15.1a4.343,4.343,0,0,1-4.31-3.76,6.184,6.184,0,0,0,4.31,1.745h15.1a6.183,6.183,0,0,0,4.31-1.746A4.344,4.344,0,0,1,1599.25,94.98Zm-5.88-10.235a2.583,2.583,0,0,1-1.47.316,6.074,6.074,0,0,1-1.36-.154,4.726,4.726,0,0,1-1.27-.477,0.9,0.9,0,0,0-.61-0.1,0.8,0.8,0,0,0-.46.281,1.1,1.1,0,0,0-.21.5,1.077,1.077,0,0,0,.09.555,1.04,1.04,0,0,0,.44.443,4.778,4.778,0,0,0,1,.421,8.131,8.131,0,0,0,1.17.26,8.276,8.276,0,0,0,1.21.091,6.022,6.022,0,0,0,1.68-.218,3.934,3.934,0,0,0,1.29-.625,2.715,2.715,0,0,0,.81-0.976,2.8,2.8,0,0,0,.29-1.27,2.291,2.291,0,0,0-.68-1.721,4.177,4.177,0,0,0-2.06-.948l-1.6-.337a2.4,2.4,0,0,1-1.03-.407,0.821,0.821,0,0,1-.3-0.66,1.06,1.06,0,0,1,.22-0.646,1.427,1.427,0,0,1,.64-0.436,2.88,2.88,0,0,1,1.01-.154,5.169,5.169,0,0,1,1.07.112,4.012,4.012,0,0,1,.99.351,1.033,1.033,0,0,0,.65.127,0.761,0.761,0,0,0,.44-0.253,0.881,0.881,0,0,0,.22-0.457,1.042,1.042,0,0,0-.07-0.519,0.884,0.884,0,0,0-.39-0.428,4.7,4.7,0,0,0-1.34-.555,6.476,6.476,0,0,0-1.56-.19,5.609,5.609,0,0,0-1.63.225,3.932,3.932,0,0,0-1.28.646,3.01,3.01,0,0,0-.83,1,2.729,2.729,0,0,0-.3,1.278,2.465,2.465,0,0,0,.66,1.791,3.812,3.812,0,0,0,2.01.962l1.6,0.337a2.767,2.767,0,0,1,1.08.408,0.772,0.772,0,0,1,.32.646A0.954,0.954,0,0,1,1593.37,84.745Z"
              transform="translate(-1577.97 -69.938)"
            ></path>
          </svg>
          <span className="whitespace-nowrap text-sm font-semibold">
            Quick Access
          </span>
        </div>
      ) : (
        <span
          onClick={() => {
            setQuery("");
          }}
          className={`clear-btn text-sm text-zinc-500 ml-auto border-b-[1px] border-b-gray-500 leading-tight hover:text-zinc-400 hover:border-b-gray-400 ease-in-out duration-200 cursor-pointer select-none ${
            query === "" ? "hidden" : "flex"
          }`}
        >
          Clear
        </span>
      )}

      {/* nav-search-dropdown */}
      {isDropdownOpen && (
        <div
          style={{ scrollbarWidth: "none" }}
          className="search-dropDown w-full max-h-[40vh] absolute bg-neutral-900 top-10 right-0 overflow-y-auto rounded-b-md "
        >
          {loading ? (
            <SearchBarLoader />
          ) : (
            searches.map((s, i) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                onClick={handleClick}
                key={i}
                className={`dropDown w-full flex items-center gap-6 px-4 py-3 sm:px-6 sm:py-4 hover:bg-zinc-800 ${
                  i % 2 === 0 ? "bg-zinc-900" : "bg-neutral-900"
                }`}
              >
                <img
                  className="h-14 w-11 block bg-cover bg-center bg-no-repeat bg-zinc-600 rounded-sm"
                  src={
                    s.poster_path ||
                    s.profile_path ||
                    s.backdrop_path ||
                    (s.known_for &&
                      s.known_for[0] &&
                      s.known_for[0].poster_path) ||
                    (s.known_for &&
                      s.known_for[1] &&
                      s.known_for[1].backdrop_path)
                      ? `https://image.tmdb.org/t/p/original/${
                          s.poster_path ||
                          s.profile_path ||
                          s.backdrop_path ||
                          (s.known_for &&
                            s.known_for[0] &&
                            s.known_for[0].poster_path) ||
                          (s.known_for &&
                            s.known_for[1] &&
                            s.known_for[1].backdrop_path)
                        }`
                      : noimage
                  }
                  alt={
                    s.name ||
                    s.title ||
                    s.original_name ||
                    s.original_title ||
                    "Image"
                  }
                />
                <div className="dropDown-right flex flex-col">
                  <span className="text-zinc-400 text-base sm:text-lg">
                    {s.name || s.title || s.original_name || s.original_title}
                  </span>
                  <div className="flex gap-6">
                    <span className="text-zinc-600 text-xs uppercase">
                      {s.media_type}
                    </span>
                    {/* <span className="text-zinc-400">{s.vote_average}/10</span> */}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
