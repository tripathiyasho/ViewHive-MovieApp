import React from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import { useState, useEffect } from "react";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "ViewHive | Homapage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");
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
  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  


  return wallpaper && trending ? (
    <>
      {/* Toggle button */}
      {/* <button
        onClick={toggleSidenav}
        className="fixed top-2 right-5 z-20 p-3  text-white  "
      >
        {isSidenavOpen ? (
          
<i className="ri-close-circle-line p-2 text-xl"> Close </i>
        ) : (
          
<i className="ri-menu-line p-2 text-xl"> Menu</i>
        )}
      </button> */}

      {/* Conditionally render sidenav */}
      {isSidenavOpen && <Sidenav  />}
      
      <div
        className={`${
          isSidenavOpen
            ? "w-[84.5%] h-full overflow-auto overflow-x-hidden transition-all  duration-1000 ease-out"
            : "w-full h-full overflow-auto overflow-x-hidden transition  ease-out duration-1000  "
        }  `}
      >
        <Topnav toggleSidenav={toggleSidenav} isSide={isSidenavOpen}  />
        <Header data={wallpaper} />

        <div className="px-5 pt-4 flex items-center justify-between 	">
          <h1 className="text-2xl italic font-semibold text-zinc-400 underline underline-offset-8 ">
            Trending Today :
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            fucn={(e) => setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
