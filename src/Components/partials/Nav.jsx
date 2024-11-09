import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

const Nav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  useEffect(() => {
    GetSearches();
  }, [query]);
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-neutral-700/80  lg:text-sm text-white">
        <div className="flex justify-between items-center flex-shrink-0 lg:p-2">
          {/* menu */}
          <div className="ml-1 ">
            <button onClick={toggleSidenav}>
              {isSidenavOpen ? (
                <i className=" ri-close-circle-line text-2xl lg:hover:text-[#E50914]  "></i>
              ) : (
                <i className="ri-menu-line text-2xl lg:hover:text-[#E50914]">
                  {" "}
                </i>
              )}
            </button>
          </div>

          {/*search bar*/}
          <div className="hidden  lg:flex items-center flex-shrink-0 ">
            <i className="pl-48 text-xl ri-search-line  "></i>
            <input
              onChange={(e) => setquery(e.target.value)}
              value={query}
              className="w-[40vw]   text-white ml-2 p-2 text-lg outline-none border-none bg-transparent"
              type="text"
              placeholder="search anything"
            />
            {query.length > 0 && (
              <i
                onClick={() => setquery("")}
                className="  text-xl ri-close-fill right-0 "
              ></i>
            )}
          </div>
          {/* logo*/}
          <div className="flex items-center px-10 flex-shrink-0 text-lg">
            {
              <div className=" hidden lg:flex  px-10">
                <Link
                  to="/movie"
                  className="hover:text-[#E50914]  duration-300 rounded-lg p-3"
                >
                  <i className="  mr-2 ri-movie-2-fill"></i>
                  Movies
                </Link>
                <Link
                  to="/tv"
                  className=" hover:text-[#E50914] duration-300 rounded-lg p-3"
                >
                  <i className=" mr-2 ri-tv-2-fill"></i>
                  Tv Shows
                </Link>
              </div>
            }

            {
              <h1 className="text-xl text-white text-center mb-3 mt-3 ">
                <i className="text-[#E50914]  ri-projector-2-fill mr-2  "></i>
                <span className="font-bold">ViewHive</span>
              </h1>
            }
          </div>
        </div>
      </nav>
      {/* search box result dropdown */}
      {!isSidenavOpen && (
        <div
          className={
            "absolute w-[43%] left-[18%] max-h-[50vh]  backdrop-blur-lg border-b border-neutral-700/80   top-[10] overflow-auto  z-100"
          }
        >
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-[#2a2929] duration-300 font-semibold text-white w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg "
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {" "}
                {s.name || s.title || s.original_title || s.original_name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Dropdown Menu */}
      {isSidenavOpen && (
        <div className="fixed z-20 backdrop-blur-lg  w-full flex flex-col    ">
          <nav className=" ml-2 text-white ">
            <h1 className="font-semibold text-xl mt-1  ">Browse :</h1>
            <div className="flex flex-wrap gap-3 ">
              <Link
                to="/trending"
                className=" hover:bg-[#E50914]  duration-300 rounded-lg p-3"
              >
                <i className=" ri-fire-fill mr-1"></i>
                Trending
              </Link>
              <Link
                to="/popular"
                className=" hover:bg-[#E50914]  duration-300 rounded-lg p-3"
              >
                <i className=" ri-bard-fill mr-1"></i>
                Popular
              </Link>
              <Link
                to="/movie"
                className=" hover:bg-[#E50914]  duration-300 rounded-lg p-3"
              >
                <i className=" ri-movie-2-fill mr-1"></i>
                Movies
              </Link>
              <Link
                to="/tv"
                className=" hover:bg-[#E50914]  duration-300 rounded-lg p-3"
              >
                <i className=" ri-tv-2-fill mr-1"></i>
                Tv Shows
              </Link>
              <Link
                to="/people"
                className="  hover:bg-[#E50914]  duration-300 rounded-lg p-3 "
              >
                <i className=" ri-team-fill mr-1"></i>
                People
              </Link>
            </div>
            <h1 className="font-semibold text-xl  ">Website Information :</h1>
            <div className="flex flex-wrap gap-3 mb-4">
              <Link className=" hover:bg-[#E50914]  duration-300 rounded-lg p-3">
                <i className=" ri-information-fill mr-1"></i> About ViewHive
              </Link>
              <Link className=" hover:bg-[#E50914]  duration-300 rounded-lg p-3">
                <i className=" ri-phone-fill mr-1"></i>
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Nav;
