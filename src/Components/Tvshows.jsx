import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonNav from "./partials/CommonNav";
import Dropdown from "./partials/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import NavCommon from "./partials/NavCommon";

const TVshows = () => {
  document.title = "ViewHive | Tv Shows";
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);

  const Gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      //   settv(data.results);
      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (tv.length === 0) {
      Gettv();
    } else {
      setpage(1);
      settv([]);
      Gettv();
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

  return tv.length > 0 ? (
    <div className=" w-screen h-screen ">
      <NavCommon />

      <div className="w-full mt-3 px-6 md:px-24 flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="hidden md:inline-block text-4xl md:text-5xl lg:text-6xl font-serif  text-[#beb2b2] animate-pulse tracking-wide ">
          TV Shows :
        </h1>

        <Dropdown
          title="Category"
          options={["popular", "top_rated", "on_the_air", "airing_today"]}
          fucn={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={Gettv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
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

export default TVshows;
