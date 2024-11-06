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
        {/* Navbar part */}
        <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl ">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#E50914] ri-arrow-left-line"
          ></Link>
          <a target="_blank" href={info.detail.homepage}>
            <i className=" hover:text-[#E50914] ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className=" hover:text-[#E50914] ri-earth-fill"></i>
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
            className="hover:text-[#E50914] "
          >
            <i className="ri-home-9-line"></i>
          </button>
        </nav>
        {/* part-2  */}
        <div className="w-full flex">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />

          <div className="content ml-[5%] text-white">
            <h1 className="text-5xl font-black ">
              {info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}

              <small className="text-2xl font-bold text-zinc-200">
                ({info.detail.release_date.split("-")[0]})
              </small>
            </h1>

            <div className="mt-3 mb-5 flex flex-col  items-start gap-x-3">
              <div className="flex">
                <h1 className=" font-semibold text-2xl mr-3">Rating :</h1>
                <span className="rounded-full text-lg font-semibold bg-[#E50914] text-white w-[4vh] h-[4vh] flex justify-center items-center">
                  {(info.detail.vote_average * 10).toFixed()}{" "}
                  <sup className="text-xs">%</sup>
                </span>
              </div>

              <h1>Release Date : {info.detail.release_date}</h1>
              <h1>
                {" "}
                Geners : {info.detail.genres.map((g) => g.name).join(",")}
              </h1>
              <h1>Duration : {info.detail.runtime}min</h1>
            </div>

            <h1 className="text-xl font-semibold italic text-zinc-200">
              {info.detail.tagline}
            </h1>

            <h1 className="text-2xl mb-3  mt-5">Overview :</h1>
            <p>{info.detail.overview}</p>

            <h1 className="text-2xl mb-3  mt-5">Available In :</h1>
            <p className="mb-10">{info.translations.join(", ")}</p>

            <Link
              className="p-5 bg-[#E50914] rounded-lg"
              to={`${pathname}/trailer`}
            >
              <i className="text-xl ri-play-fill mr-3 "></i>
              Play Trailer
            </Link>
          </div>
        </div>
        {/* part-3  */}
        <div className="w-[80%] flex flex-col gap-y-5 mt-10">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Platfotms</h1>
              {info.watchproviders.flatrate.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Rent</h1>
              {info.watchproviders.rent.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available to Buy</h1>
              {info.watchproviders.buy.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
        {/* part-4  */};
        <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
        <h1 className=" text-3xl font-bold text-white">
          Recommendations & Similar stuff
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
