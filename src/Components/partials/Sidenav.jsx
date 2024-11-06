import React, { useEffect } from "react";
import { Link } from "react-router-dom";


const Sidenav = () => {
  return (
    <div className="w-[15.5%] h-full border-r-2 border-zinc-300 p-2">
      <h1 className="text-xl text-white text-center mb-2 mt-2 ">
        <i className="text-[#E50914]  ri-projector-2-fill mr-2  "></i>
        <span className="font-bold">ViewHive</span>
      </h1>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-lg gap-3 text-center">
        <h1 className="text-white font-semibold text-2xl  mt-3 italic ">New Feeds</h1>
        <Link
          to="/trending"
          className="hover:bg-[#E50914] hover:text-white duration-300 rounded-lg p-3"
        >
          <i className="ri-fire-fill"></i>
          Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#E50914] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-bard-fill"></i>
          Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#E50914] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-movie-2-fill"></i>
          Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#E50914] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-tv-2-fill"></i>
          Tv Shows
        </Link>
        <Link to="/people" className=" mb-5 hover:bg-[#E50914] hover:text-white duration-300 rounded-lg p-3 ">
          <i className="mr-2 ri-team-fill"></i>
          People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-lg gap-3 text-center">
        <h1 className="text-white font-semibold text-xl mt-3 italic">
          Website Information
        </h1>
        <Link className="hover:bg-[#E50914] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-information-fill"></i> About ViewHive
        </Link>
        <Link className="hover:bg-[#E50914] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-phone-fill"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
