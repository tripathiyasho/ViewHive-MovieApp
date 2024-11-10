import React, { useEffect } from "react";
import Dropdown from "./partials/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import NavCommon from "./partials/NavCommon";
import CardLoader from "./partials/CardLoader";
const Popular = () => {
  document.title = "ViewHive | Popular";

  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      //   setpopular(data.results);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  //  console.log(popular);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return popular.length > 0 ? (
    <div className=" w-screen h-screen ">
      <NavCommon />

      <div className="w-full mt-3 px-6 md:px-24 flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="hidden md:inline-block text-4xl md:text-5xl lg:text-6xl font-serif  text-[#beb2b2] animate-pulse tracking-wide ">
          Popular:
        </h1>

        <Dropdown
          title="Category"
          options={["tv", "movie"]}
          fucn={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<CardLoader />}
      >
        <Cards data={popular} title={category} />
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

export default Popular;
