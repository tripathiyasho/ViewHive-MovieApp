import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CommonNav from "./partials/CommonNav";
import Dropdown from "./partials/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import NavCommon from "./partials/NavCommon";

const Movie = () => {
  document.title = "ViewHive | Movies";
  const navigate = useNavigate();
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

  const handleHomeNavigation = () => {
    navigate("/");
  };

  return movie.length > 0 ? (
    <div className=" w-screen h-screen ">
      <NavCommon category={category} setcategory={setcategory}  />
      <div className="p-4 mt-4 w-full flex items-center justify-center    lg:px-36">
               
        <div className="flex items-center  ">
          
           <button
        onClick={handleScrollToTop}
        className="fixed bottom-10 right-10 bg-[#E50914] text-white p-2
        w-[5vh] h-[5vh] rounded-full shadow-md hover:bg-[#f40612] transition duration-300 ease-in-out"
      >
        ↑
      </button>
      <button
        onClick={handleHomeNavigation}
        className="fixed bottom-24 right-10 bg-[#E50914] text-white p-2
        w-[5vh] h-[5vh] rounded-full shadow-md hover:bg-[#f40612] transition duration-300 ease-in-out"
      >
        <i className="ri-home-9-line"></i>
      </button>
          </div>
          
      </div>
      

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
      
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
