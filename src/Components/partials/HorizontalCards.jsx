import React from "react";
import { Link } from "react-router-dom";

import noimage from "/noimage.jpg";

const HorizontalCards = ({ data, title }) => {
  return (
    <div className="w-full flex overflow-x-auto mb-5 p-6 space-x-5 scrollbar-hide">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type || title}/details/${d.id}`}
            key={i}
            className="min-w-[48%] h-[30vh] bg-gradient-to-b from-zinc-900 to-gray-800 rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 shadow-md hover:shadow-xl md:min-w-[30%] lg:min-w-[17%]"
          >
            <div className="relative h-[55%] w-full overflow-hidden rounded-t-xl">
              <img
                className="w-full h-full object-cover transition-opacity duration-300 opacity-90 hover:opacity-100"
                src={
                  d.backdrop_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original${
                        d.backdrop_path || d.poster_path
                      }`
                    : noimage
                }
                alt={d.name || d.title || "Movie Thumbnail"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            </div>
            <div className="text-white p-3 h-[45%] space-y-2">
              <h1 className="text-lg font-semibold leading-tight">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-xs text-gray-300 leading-snug">
                {d.overview.slice(0, 45)}...
                <span className="text-gray-400"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
