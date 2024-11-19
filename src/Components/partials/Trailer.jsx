import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category]?.info?.videos);

  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      {/* Close button */}
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#E50914] ri-close-fill text-3xl text-white right-4 top-4 md:right-[5%] md:top-[5%]"
      ></Link>
      
      {/* Player or Not Found */}
      {ytvideo ? (
        <div className="w-[90%] h-[60%] md:w-[80%] md:h-[70%] lg:w-[70%] lg:h-[80%]">
          <ReactPlayer
            controls
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
