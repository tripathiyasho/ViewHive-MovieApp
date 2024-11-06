import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonNav from "./partials/CommonNav";
import Dropdown from "./partials/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = "ViewHive | Trending";

  const navigate = useNavigate();
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

  const handleHomeNavigation = () => {
    navigate("/");
  };

  return trending.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className="px-[3%] mt-4 w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#E50914] ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <CommonNav />
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
      <hr className="border-none h-[2px] mt-4 bg-zinc-400" />

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
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
  ) : (
    <Loading />
  );
};

export default Trending;
