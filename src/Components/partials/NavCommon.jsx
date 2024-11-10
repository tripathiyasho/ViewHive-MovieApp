import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";
import { useNavigate } from "react-router-dom";

const NavCommon = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const navigate = useNavigate();

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };

  useEffect(() => {
    GetSearches();
  }, [query]);
  return (
    <>
      <nav className="w-full overflow-hidden top-0 z-50 backdrop-blur-lg border-neutral-700/80  lg:text-sm text-white">
        <div className="flex justify-between items-center flex-shrink-0 lg:p-2">
          {/* navigation */}
          <div className="text-2xl  flex ">
            <i
              onClick={() => navigate(-1)}
              className=" ml-3 hover:text-[#E50914] ri-arrow-left-line md:ml-6 "
            ></i>
            <button onClick={handleHomeNavigation} className="ml-4 md:ml-6">
              <i className=" ri-home-9-line"></i>
            </button>
          </div>

          {/*search bar*/}
          <div className="hidden  lg:flex items-center flex-shrink-0 ">
            <i className="pl-12 text-xl ri-search-line  "></i>
            <input
              onChange={(e) => setquery(e.target.value)}
              value={query}
              className="w-[30vw]   text-white ml-2 p-2 text-lg outline-none border-none bg-transparent"
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
          <div className="flex items-center pr-10 flex-shrink-0 text-lg">
            {
              <div className=" hidden lg:flex pl-2  pr-5">
                <Link to="/contactus" className=" hover:text-[#E50914]  duration-300 rounded-lg p-3">
                  <i className=" ri-phone-fill mr-2"></i>
                  Contact Us
                </Link>
                <Link to="/aboutus" className=" hover:text-[#E50914]  duration-300 rounded-lg p-3">
                  <i className=" ri-information-fill mr-2"></i> About ViewHive
                </Link>
              </div>
            }

            {
              <h1 className="text-xl text-white text-center mb-3 mt-3 md:mr-6 ">
                <i className="text-[#E50914]  ri-projector-2-fill mr-2  "></i>
                <span className="font-bold">ViewHive</span>
              </h1>
            }
          </div>
        </div>
      </nav>
      {/* search box result dropdown */}
      {
        <div
          className={
            "absolute w-[37%] left-[17.5%] max-h-[50vh]  backdrop-blur-lg  z-30   top-[10] overflow-auto  "
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
      }
    </>
  );
};

export default NavCommon;
