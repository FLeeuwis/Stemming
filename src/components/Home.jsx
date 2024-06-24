// Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataChart from "./DataChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const moodToPlaylist = {
  1: "4NX7OGpc4HVFYmB2hNcGpV", // angry playlist
  2: "1XE7rQIGl1NFtWEAfwn4b9", // frown playlist
  3: "3TejicIfBAtllqAO6iOUgu", // woozy playlist
  4: "37i9dQZF1DWSsPOGuds90p", // cry playlist
  5: "4R79MKLEDov4pzeNQP6RdP", // Calm playlist
  6: "37i9dQZF1DWYBO1MoTDhZI", // sunnies playlist
  7: "37i9dQZF1DX6QClArDhvcW", // sleepy playlist
  8: "16OtXQVtM7e34lTZfrSbYd", // grinning playlist
  9: "37i9dQZF1DWVf1Phr4ZVgO", // heart playlist
  10: "5sSykt3JYdAuEycuQQfVWF", // goofy playlist
};

const Home = () => {
  const navigate = useNavigate();
  const [latestMood, setLatestMood] = useState(null);
  const [spotifyTrack, setSpotifyTrack] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLatestMood = async () => {
      const querySnapshot = await getDocs(collection(db, "stemmingen"));
      const data = querySnapshot.docs.map((doc) => doc.data());

      if (data.length > 0) {
        const latestMood = data.sort((a, b) => b.timestamp - a.timestamp)[0];
        setLatestMood(latestMood.mood);
        setData(data);

        const playlistID = moodToPlaylist[latestMood.mood];
        fetchRandomTrackFromPlaylist(playlistID);
      }
    };
    const fetchRandomTrackFromPlaylist = async (playlistID) => {
      try {
        const response = await spotifyApi.getPlaylistTracks(playlistID);
        const tracks = response.items;
        const randomTrack =
          tracks[Math.floor(Math.random() * tracks.length)].track.id;
        setSpotifyTrack(randomTrack);
      } catch (error) {
        console.error("Error fetching tracks from Spotify:", error);
      }
    };
    const accessToken = window.localStorage.getItem("token");
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      fetchLatestMood();
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const handleBoatClick = () => {
    navigate("/stemming");
  };

  return (
    <div className="h-screen bg-white flex flex-col justify-between relative">
      <div className="flex justify-center items-center h-1/2">
        <div className="font-koulen text-[74px] text-[#3B3939]">
          <h1>Stemming</h1>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-[#3B3939] text-white font-bold py-2 px-4 rounded hover:bg-[#343334]"
          >
            Logout
          </button>
        </div>
      </div>
      {/* chart en Spotify player sectie */}
      <div className="flex flex-1 p-4 space-x-4">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative h-96 w-full p-4 bg-gray-100">
            <DataChart data={data} />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {spotifyTrack && (
            <iframe
              src={`https://open.spotify.com/embed/track/${spotifyTrack}`}
              width="100%"
              height="400"
              frameBorder="0"
              allow="encrypted-media"
              className="rounded-lg"
            ></iframe>
          )}
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

export default Home;
