import React from "react";
import { Link } from "react-router-dom";

import noimage from "/noimage.jpg";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%]  flex overflow-y-hidden mb-5 p-6 ">
      {data.map((d, i) => (
        <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[48%] h-[30vh] bg-zinc-900 mr-5 mb-5 md:min-w-[30%] lg:min-w-[17%] ">
          <img
            className="w-full h-[55%] object-cover"
            src={
              d.backdrop_path || d.poster_path
                ? `https://image.tmdb.org/t/p/original${
                    d.backdrop_path || d.poster_path
                  }`
                : noimage
            }
            alt=""
          />
          <div className="text-white p-3 h-[45%] overflow-y-auto  ">
            <h1 className=" text-m font-semibold ">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="text-xs">
              {d.overview.slice(0, 45)}...
              <span className="text-zinc-500"> more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
// min-w-[15%] h-[30vh] bg-zinc-900 mr-5 mb-5