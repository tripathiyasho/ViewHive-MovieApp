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
  const [trending, settrending] = useState(null);
  const [popular, setpopular] = useState(null);  
  const [category, setcategory] = useState("all");
  const [category2, setcategory2] = useState("tv");
  
 

  const [isSidenavOpen, setIsSidenavOpen] = useState(false); // State to control sidenav visibility

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
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category2}/popular`);
      setpopular(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  
  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
    GetPopular();
  }, [category,category2]);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  


  return wallpaper && trending||popular ? (
    <>
      
      
      <div
        className={"w-full h-full overflow-auto overflow-x-hidden "}
      >
        <Nav toggleSidenav={toggleSidenav} isSide={isSidenavOpen} />

        <Header data={wallpaper} />

        <div className="px-5 pt-4 flex items-center justify-between 	">
          <h1 className="text-lg italic font-semibold text-white  ">
            Trending :
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            fucn={(e) => setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />

        <div className="px-5 pt-4 flex items-center justify-between 	">
          <h1 className="text-lg i font-semibold text-white  italic ">
            Popular :
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", ]}
            fucn={(e) => setcategory2(e.target.value)}
          />
        </div>

        <HorizontalCards data={popular} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
