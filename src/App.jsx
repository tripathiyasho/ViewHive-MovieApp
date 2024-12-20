import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import Tvshows from "./Components/Tvshows";
import People from "./Components/People";
import MovieDetails from "./Components/MovieDetails";
import TvDetails from "./Components/TvDetails";
import PersonDetails from "./Components/PersonDetails";
import Trailer from "./Components/partials/Trailer";
import NotFound from "./Components/NotFound";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";

function App() {
  return (
    <div className="bg-[#141414] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />

        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<Tvshows />} />

        <Route path="/tv/details/:id" element={<TvDetails />}>
        <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/people" element={<People />} />

        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path= "/aboutus" element={<AboutUs/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;

