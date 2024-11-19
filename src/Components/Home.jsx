import React from "react";
import axios from "../utils/axios";
import { useState, useEffect } from "react";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";
import Nav from "./partials/Nav";

const Home = () => {
  document.title = "ViewHive | Homapage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState([]);
  const [popular, setpopular] = useState([]);
  const [category, setcategory] = useState("all");
  const [categoryto, setcategoryto] = useState("tv");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all//day`);

      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
      console.log("API response data:", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // console.log(trending);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${categoryto}/popular`);
      // console.log("API response data:", data); // Log API response
      setpopular(data.results);
    } catch (error) {
      console.error(
        "Error fetching popular data: ",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  useEffect(() => {
    GetPopular();
  }, [categoryto]);

  return wallpaper && trending ? (
    <>
      <div className={"w-full h-full overflow-auto overflow-x-hidden "}>
        <Nav />
        <Header data={wallpaper} />

        <div className="px-5 pt-4  flex items-center justify-between 	">
          <h1 className="text-lg italic font-semibold text-white  ">
            Trending :
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            fucn={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} title={category} />
        <div className="px-5 pt-4 flex items-center justify-between 	">
          <h1 className="text-lg i font-semibold text-white  italic ">
            Popular :
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie"]}
            fucn={(e) => setcategoryto(e.target.value)}
          />
        </div>
        <HorizontalCards data={popular} title={categoryto} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
