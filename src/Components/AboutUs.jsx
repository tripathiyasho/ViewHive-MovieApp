import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  document.title = "ViewHive | About Us";
  const handleHomeNavigation = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#141414] text-white h-max min-h-screen flex flex-col items-center px-6 md:px-16 lg:px-24 py-12">
      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-start mb-6">
        <div className="text-2xl flex items-center gap-6 ml-4 md:ml-8 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#E50914] ri-arrow-left-line cursor-pointer mr-4"
          ></i>
          <button onClick={handleHomeNavigation}>
            <i className="ri-home-9-line hover:text-[#E50914] cursor-pointer"></i>
          </button>
        </div>
      </div>

      {/* Content  */}

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#E50914]">
        About ViewHive
      </h1>

      <section className="max-w-4xl">
        <p className="text-lg text-gray-300 leading-relaxed mb-6 text-center">
          Welcome to{" "}
          <span className="text-[#E50914] font-semibold">ViewHive</span>, your
          one-stop destination for all things movies and TV shows. Explore
          trending and popular titles, get detailed information about release
          dates, streaming platforms, rental options, and much more. Dive into a
          rich knowledge base for the world of entertainment with us!
        </p>

        <h2 className="text-3xl font-semibold mb-4 mt-10 text-[#E50914]">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-4 ml-6">
          <li>
            Responsive and user-friendly interface, designed with HTML, CSS, and
            JavaScript.
          </li>
          <li>
            Dynamic browsing experience using <strong>React.js</strong> for
            state management with <strong>Redux</strong>.
          </li>
          <li>
            Seamless navigation with <strong>React-Router-DOM</strong>.
          </li>
          <li>
            Up-to-date movie and TV show data powered by the{" "}
            <strong>TMDB API</strong>.
          </li>
          <li>
            Optimized API requests with <strong>Axios</strong> for better
            performance.
          </li>
          <li>
            Lazy loading content with{" "}
            <strong>React-Infinite-Scroll-Component</strong> to improve load
            times.
          </li>
          <li>
            Smooth video playback using <strong>React-Player</strong>.
          </li>
          <li>
            Modern, responsive interface built with{" "}
            <strong>Tailwind CSS</strong>.
          </li>
          <li>
            Deployed on <strong>Vercel</strong> for continuous updates and fast
            performance.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold mt-10 mb-4 text-[#E50914]">
          Technologies Used
        </h2>
        <div className="text-gray-300 leading-relaxed space-y-2">
          <p>
            <strong>Frontend:</strong> HTML, CSS, JavaScript, React.js, Redux,
            React-Router-DOM, Tailwind CSS
          </p>
          <p>
            <strong>API Integration:</strong> TMDB API, Axios
          </p>
          <p>
            <strong>Additional Libraries:</strong>{" "}
            React-Infinite-Scroll-Component, React-Player
          </p>
          <p>
            <strong>Deployment:</strong> Vercel
          </p>
        </div>
      </section>

      <section className="mt-12 text-center">
        <p className="text-lg text-gray-300 mb-2">
          <span className="text-[#E50914] font-semibold">ViewHive</span> is
          designed to bring the world of entertainment to your fingertips.
          Whether you’re looking for popular titles or in-depth information on a
          specific show,{" "}
          <span className="text-[#E50914] font-semibold">ViewHive</span> has it
          all.
        </p>
        <p className="text-lg text-gray-300">
          Dive into the magic of movies and TV shows with us. Happy browsing!
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
