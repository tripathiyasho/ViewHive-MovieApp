import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const NavCommon = ({ category, setcategory }) => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const navigate = useNavigate();

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
  const handleHomeNavigation = () => {
    navigate("/");
  };
  useEffect(() => {
    GetSearches();
  }, [query]);
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-neutral-700/80  lg:text-sm text-white">
        <div className="flex justify-between lg:justify-between items-center flex-shrink-0 lg:p-2">
          {/* Navigation*/}
          <h1
            onClick={() => navigate(-1)}
            className="hidden lg:flex text-xl font-semibold text-white cursor-pointer hover:text-[#E50914] gap-2"
          >
            <i className="ri-arrow-left-line"></i> Go Back
          </h1>

          {/*search bar*/}
          <div className="hidden  lg:flex items-center   flex-shrink-0 ">
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
         
          <Dropdown
              title={category.toUpperCase()}
              options={["popular", "top_rated", "upcoming", "now_playing"]}
              fucn={(e) => setcategory(e.target.value)}
            />
                         

            <div>
            <h1 className="text-xl text-white text-center mb-3 mt-3 px-10">
                <i className="text-[#E50914]  ri-projector-2-fill mr-2  "></i>
                <span className="font-bold">ViewHive</span>
              </h1>
            </div>
              
            
         
        </div>
        {/* search box result dropdown */}
        {!isSidenavOpen && (
          <div
            className={
              " absolute w-[43%] left-[18%] max-h-[50vh]  backdrop-blur-lg border-b border-neutral-700/80    top-[10] overflow-auto  z-[100]  "
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
        <hr className=" border-zinc-50" />
      </nav>
    </>
  );
};

export default NavCommon;
