import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonNav from "./partials/CommonNav";
import Dropdown from "./partials/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
const Popular = () => {
  document.title = "ViewHive | Popular";

  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);

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

  const refreshHandler = async () => {
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

  const handleHomeNavigation = () => {
    navigate("/");
  };

  return popular.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className="px-[3%] mt-4 w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#E50914] ri-arrow-left-line"
          ></i>{" "}
          Popular
        </h1>
        <div className="flex items-center w-[80%]">
           <CommonNav />
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            fucn={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <hr className="border-none h-[2px] mt-4 bg-zinc-400" />

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
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

export default Popular;
