import React, { useEffect } from "react";
import Dropdown from "./partials/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import NavCommon from "./partials/NavCommon";
import CardLoader from "./partials/CardLoader";
const Movie = () => {
  document.title = "ViewHive | Movies";
  const [category, setcategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      //   setMovie(data.results);
      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setpage(1);
      setMovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return movie.length > 0 ? (
    <div className=" w-screen h-screen ">
      <NavCommon />

      <div className="w-full mt-3 px-6 md:px-24 flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="hidden md:inline-block text-4xl md:text-5xl lg:text-6xl font-serif  text-[#beb2b2] animate-pulse tracking-wide ">
          Movies :
        </h1>

        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          fucn={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<CardLoader />}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-10 right-10  text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-600 to-rose-700 animate-bounce tracking-wide font-extrabold text-5xl"
      >
        ↑
      </button>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
