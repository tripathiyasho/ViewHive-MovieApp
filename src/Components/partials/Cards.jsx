import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const getVoteColor = (vote) => {
  if (vote >= 75) return "text-green-500";
  if (vote >= 50) return "text-yellow-500";
  if (vote >= 25) return "text-orange-500";
  return "text-red-500";
};

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap justify-center w-full h-full px-[5%] pt-10 bg-[#141414] gap-4">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[48%] sm:w-[48%] md:w-[30%] lg:w-[22%] h-auto bg-[#1c1c1c] rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
          key={i}
        >
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              
              className="w-full h-[40vh] object-cover rounded-t-lg"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimage
              }
              alt={c.name || c.title || "Thumbnail"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-90 transition-opacity duration-300 p-4">
              <h1 className="text-lg text-white font-semibold leading-tight">
                {c.name || c.title || c.original_name || c.original_title}
              </h1>
              {c.overview && (
                <p className="text-xs text-gray-300 mt-2 line-clamp-3">
                  {c.overview}
                </p>
              )}
            </div>
          </div>

          {c.vote_average && (
            <div
              className={`absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center shadow-md ${getVoteColor(
                Math.round(c.vote_average * 10)
              )}`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-4 border-current border-r-transparent animate-spin-slow"
                  style={{
                    transform: `rotate(${(c.vote_average / 10) * 180}deg)`,
                  }}
                ></div>
                <span className="text-white font-bold text-sm">
                  {Math.round(c.vote_average * 10)}<sup>%</sup>
                </span>
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
