import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Stemming = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const handleBoatClick = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen bg-white flex flex-col justify-between relative">
      <div className="flex justify-center items-center h-1/2">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-[#3B3939] text-white font-bold py-2 px-4 rounded hover:bg-[#343334]"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Waves sectie */}
      <div className="waves">
        <svg
          className="parallax"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 40"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(111, 23, 255, 0.7)"
            ></use>
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(111, 23, 255, 0.5)"
            ></use>
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(111, 23, 255, 0.3)"
            ></use>
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#6F17FF"></use>
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="#6F17FF"></use>
          </g>
        </svg>
      </div>
      {/* Boot afbeelding */}
      <div className="relative">
        <img
          src="/images/boat.png"
          alt="Boot"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-auto cursor-pointer"
          onClick={handleBoatClick}
        />
      </div>
    </div>
  );
};

export default Stemming;
