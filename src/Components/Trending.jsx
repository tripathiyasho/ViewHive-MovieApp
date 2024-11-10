import React, { useEffect } from "react";
import NavCommon from "./partials/NavCommon";
import Dropdown from "./partials/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import CardLoader from "./partials/CardLoader";

const Trending = () => {
  document.title = "ViewHive | Trending";

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      //   settrending(data.results);
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return trending.length > 0 ? (
    <div className=" w-screen h-screen ">
      <NavCommon />

      <div className="w-full mt-3 px-6 md:px-24 flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="hidden md:inline-block text-4xl md:text-5xl lg:text-6xl font-serif  text-[#beb2b2] animate-pulse tracking-wide ">
          Trending:
        </h1>
        <div className="flex gap-4">
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            fucn={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            fucn={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<CardLoader />}
      >
        <Cards data={trending} title={category} />
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

export default Trending;
