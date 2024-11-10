import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonNav from "./partials/CommonNav";
import { useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import NavCommon from "./partials/NavCommon";

const People = () => {
  document.title = "ViewHive | Peoples";
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);
  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      //   setpeople(data.results);
      if (data.results.length > 0) {
        setpeople((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (people.length === 0) {
      GetPeople();
    } else {
      setpage(1);
      setpeople([]);
      GetPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 

  return people.length > 0 ? (
    <div className=" w-screen h-screen ">
 <NavCommon />

<div className="w-full mt-3 px-6 md:px-24 flex flex-col md:flex-row md:justify-between items-center">
  <h1 className="hidden md:inline-block text-4xl md:text-5xl lg:text-6xl font-serif  text-[#beb2b2] animate-pulse tracking-wide ">
    Celebrities:
  </h1>

</div>

      
      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title="person" />
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

export default People;
