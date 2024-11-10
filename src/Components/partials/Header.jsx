import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  const imageUrl = data.backdrop_path || data.profile_path
    ? `https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}`
    : null;

  return (
    <div className="w-full h-[80vh] relative bg-[#141414]">
      {imageUrl ? (
        <img
          loading="lazy"
          src={imageUrl}
          alt={data.name || data.title || "Header Background"}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[#141414]"></div>
      )}
      {/* Overlay and Gradient Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-transparent via-[#04152d]/0 z-10"></div>
      <div className="pl-[5%] absolute w-full bottom-14 flex flex-col justify-start items-start h-[50vh] z-20">
        <h1 className="w-[70%] text-3xl lg:text-5xl font-black text-white">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className="w-[70%] lg:w-[50%] text-md lg:text-xl mt-3 mb-3 text-white">
          {data.overview.slice(0, 200)}...{" "}
          <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">
            more
          </Link>
        </p>
        <p className="text-white">
          <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
          {data.release_date || "No Information"}
          <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
          {data.media_type.toUpperCase()}
        </p>
        <Link
          className="flex items-center justify-center p-4 bg-gradient-to-r from-[#E50914] to-[#d40e4c] text-white font-semibold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl w-[50vw] mt-3 md:w-[22vw] lg:w-[16vw]"
          to={`/${data.media_type}/details/${data.id}/trailer`}
        >
          <i className="text-xl ri-play-fill mr-3"></i>
          Play Trailer
        </Link>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414] via-[#04152d]/0"></div>
    </div>
  );
};

export default Header;
