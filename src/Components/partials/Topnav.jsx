import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

const Topnav = ({ toggleSidenav, isSide }) => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <>
      <div className={`"w-full h-[8vh] flex relative items-center ${isSide? "" : "justify-between"}`}>
        <div>
          <button onClick={toggleSidenav} className="mr-72  ">
            {isSide ? (
              
<i className="ri-close-circle-line p-2 text-xl text-zinc-400 ">
                {" "}
                Close{" "}
              </i>
            ) : (
              
<i className="ri-menu-line p-2 text-xl ml-6 text-zinc-400"> Menu</i>
            )}
          </button>
        </div>

        <div>
          <i className="text-zinc-400 text-2xl ri-search-line "></i>
          <input
            onChange={(e) => setquery(e.target.value)}
            value={query}
            className="w-[40vw]  text-zinc-200 mx-2 p-5 text-lg outline-none border-none bg-transparent"
            type="text"
            placeholder="search anything"
          />
          {query.length > 0 && (
            <i
              onClick={() => setquery("")}
              className=" text-zinc-400 text-2xl ri-close-fill right-0 ]"
            ></i>
          )}
        </div>
        {!isSide && (
          <div className="flex ">
            <Link
              to="/movie"
              className=" text-zinc-400 duration-300 rounded-lg p-3"
            >
              <i className="mr-2 ri-movie-2-fill"></i>
              Movies
            </Link>
            <Link
              to="/tv"
              className="text-zinc-400 duration-300 rounded-lg p-3"
            >
              <i className="mr-2 ri-tv-2-fill"></i>
              Tv Shows
            </Link>
          </div>
        )}

        {!isSide && (
          <div className="mr-10">
            <h1 className="text-xl text-white text-center mb-3 mt-3 ">
              <i className="text-[#E50914]  ri-projector-2-fill mr-2  "></i>
              <span className="font-bold">ViewHive</span>
            </h1>
          </div>
        )}
      </div>

      <div
        className={`absolute w-[43%] max-h-[50vh] bg-[#141414] bgt top-[8%] ${
          isSide ? "left-[41%]" : "left-[29%]"
        } overflow-auto  z-100`}
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
    </>
  );
};

export default Topnav;
//
