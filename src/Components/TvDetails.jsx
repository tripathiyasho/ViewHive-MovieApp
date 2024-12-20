import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import noimage from "/noimage.jpg";

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const TvDetails = () => {
  document.title = "ViewHive | ShowDetail";
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  const getProgressColor = (rating) => {
    if (rating >= 75) return "#16a34a"; // green for high rating
    if (rating >= 50) return "#facc15"; // yellow for moderate rating
    return "#dc2626"; // red for low rating
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };

  return info ? (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="relative w-screen h-max px-[10%]"
      >
        {/* Navbar */}
        <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-4 text-lg md:text-xl">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#E50914] ri-arrow-left-line"
          ></Link>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="hover:text-[#E50914] ri-earth-fill"></i>
          </a>
          <a
            className="hover:text-[#E50914]"
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            imdb
          </a>
          <button
            onClick={handleHomeNavigation}
            className="hover:text-[#E50914]"
          >
            <i className="ri-home-9-line"></i>
          </button>
        </nav>

        <div className="w-full flex flex-col md:flex-row gap-6">
          <img
            className="rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[70vh] object-cover md:h-[50vh] lg:h-[60vh]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path || noimage
            }`}
            alt="Show poster"
          />

          <div className="content ml-[5%] text-white">
            <h1 className="text-5xl font-black">
              {info.detail.name || info.detail.title || info.detail.original_name}
              <small className="text-2xl font-bold text-zinc-200">
                ({info.detail.first_air_date.split("-")[0]})
              </small>
            </h1>

            <div className="mt-3 mb-5 flex flex-col items-start gap-x-3">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-2xl">Rating:</h1>
                <span
                  className="rounded-full text-lg font-semibold text-white w-[4vh] h-[4vh] flex justify-center items-center"
                  style={{
                    backgroundColor: getProgressColor(info.detail.vote_average * 10),
                  }}
                >
                  {(info.detail.vote_average * 10).toFixed()}
                  <sup className="text-xs">%</sup>
                </span>
              </div>

              <h1>OnAir Date: {info.detail.first_air_date}</h1>
              <h1>
                Genres: {info.detail.genres.map((g) => g.name).join(", ")}
              </h1>
            </div>

            <h1 className="text-2xl mb-3 mt-5">Overview:</h1>
            <p>{info.detail.overview}</p>

            <h1 className="text-2xl mb-3 mt-5">Available In:</h1>
            <p className="mb-10">{info.translations.join(", ")}</p>

            <Link
              className="flex items-center p-4 bg-gradient-to-r from-[#E50914] to-[#d40e4c] text-white font-semibold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl w-[40vw] mt-3 md:w-[22vw] lg:w-[16vw]"
              to={`${pathname}/trailer`}
            >
              <i className="text-xl ri-play-fill mr-3"></i>
              Play Trailer
            </Link>
          </div>
        </div>

        {/* Platform availability */}
        <div className="w-[80%] flex flex-col gap-y-5 mt-10">
          {info.watchproviders?.flatrate && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Platforms</h1>
              {info.watchproviders.flatrate.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={`${w.provider_name} logo`}
                />
              ))}
            </div>
          )}

          {info.watchproviders?.rent && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Rent</h1>
              {info.watchproviders.rent.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={`${w.provider_name} logo`}
                />
              ))}
            </div>
          )}

          {info.watchproviders?.buy && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available to Buy</h1>
              {info.watchproviders.buy.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={`${w.provider_name} logo`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Seasons and recommendations */}
        <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
        <h1 className="text-3xl font-bold text-white">Seasons</h1>
        {info.detail.seasons && (
          <HorizontalCards title="Seasons" data={info.detail.seasons} />
        )}
        <hr className="mb-5 border-none h-[2px] bg-zinc-500" />
        <h1 className="text-3xl font-bold text-white">
          Recommendations & Similar Stuff
        </h1>
        <HorizontalCards
          title="tv"
          data={info.recommendations.length > 0 ? info.recommendations : info.similar}
        />
        <Outlet />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default TvDetails;
