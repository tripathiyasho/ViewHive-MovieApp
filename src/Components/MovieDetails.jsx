import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const MovieDetails = () => {
  const { id } = useParams();
  document.title = "ViewHive | MovieDetail";
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  const RatingAndTrailer = ({ info }) => {
    const rating = (info.detail.vote_average * 10).toFixed(); // rating as a percentage

    const getProgressColor = () => {
      if (rating >= 75) return "#16a34a"; // green
      if (rating >= 50) return "#facc15"; // yellow
      return "#dc2626"; // red
    };

    return (
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#e6e6e6"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke={getProgressColor()}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 35}`}
              strokeDashoffset={`${2 * Math.PI * 35 * (1 - rating / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
            {rating}%
          </div>
        </div>
        <span className="text-xl font-semibold">Rating</span>
      </div>
    );
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
        className="relative w-full h-max px-[10%]"
      >
        <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-4 text-lg md:text-xl">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#E50914] ri-arrow-left-line"
          ></Link>
          <a target="_blank" href={info.detail.homepage}>
            <i className="hover:text-[#E50914] ri-external-link-fill"></i>
          </a>
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
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[70vh] object-cover rounded-lg md:h-[50vh] lg:h-[60vh]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />

          <div className="content ml-[5%] text-white">
            <h1 className="text-3xl md:text-5xl font-black">
              {info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}

              <small className="text-lg md:text-2xl font-bold text-zinc-200">
                ({info.detail.release_date.split("-")[0]})
              </small>
            </h1>

            <div className="mt-3 mb-5 flex flex-col items-start gap-x-3">
              <RatingAndTrailer info={info} />
              {info.detail.release_date && <h1>Release Date: {info.detail.release_date}</h1> }
              {<h1>Genres: {info.detail.genres.map((g) => g.name).join(", ")}</h1> }
              {info.detail.runtime && <h1>Duration: {info.detail.runtime}min</h1>
            }
             
              
            </div>

            <h1 className="text-xl font-semibold italic text-zinc-200">
              {info.detail.tagline}
            </h1>

            <h1 className="text-2xl mb-3 mt-5">Overview:</h1>
            <p>{info.detail.overview}</p>

            <h1 className="text-2xl mb-3 mt-5">Available In:</h1>
            <p className="mb-10">{info.translations.join(", ")}</p>

            {/* Trailer Button Styling */}
            <Link
              className="flex items-center justify-center p-4 bg-gradient-to-r from-[#E50914] to-[#d40e4c] text-white font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl w-[40vw] mt-3 md:w-[22vw] lg:w-[16vw]"
              to={`${pathname}/trailer`}
            >
              <i className="text-xl ri-play-fill mr-3"></i>
              Play Trailer
            </Link>
          </div>
        </div>

        <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
        <h1 className="text-3xl font-bold text-white">
          Recommendations & Similar Stuff
        </h1>
        <HorizontalCards
          title="movie"
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
