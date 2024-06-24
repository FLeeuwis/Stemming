import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataChart from "./DataChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const moodToPlaylist = {
  1: "sadPlaylistID", // Sad playlist
  2: "angryPlaylistID", // Angry playlist
  3: "melancholicPlaylistID", // Melancholic playlist
  4: "chillPlaylistID", // Chill playlist
  5: "calmPlaylistID", // Calm playlist
  6: "upliftingPlaylistID", // Uplifting playlist
  7: "lovePlaylistID", // Love playlist
  8: "coolPlaylistID", // Cool playlist
  9: "happyPlaylistID", // Happy playlist
  10: "funPlaylistID", // Fun playlist
};

const Home = () => {
  const navigate = useNavigate();
  const [latestMood, setLatestMood] = useState(null);
  const [spotifyTrack, setSpotifyTrack] = useState("");

  useEffect(() => {
    const fetchLatestMood = async () => {
      const querySnapshot = await getDocs(collection(db, "stemmingen"));
      const data = querySnapshot.docs.map((doc) => doc.data());

      if (data.length > 0) {
        const latestMood = data.sort((a, b) => b.timestamp - a.timestamp)[0];
        setLatestMood(latestMood.mood);

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

    fetchLatestMood();
  }, []);

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
      {/* chart sectie */}
      <div className="flex flex-1 p-4">
        <div className="w-full md:w-1/2">
          <div className="relative h-64 md:h-96">
            <DataChart />
          </div>
        </div>
      </div>
      {/* Spotify player sectie */}
      <div className="flex justify-center items-center mb-4">
        {spotifyTrack && (
          <iframe
            src={`https://open.spotify.com/embed/track/${spotifyTrack}`}
            width="300"
            height="80"
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"
          ></iframe>
        )}
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
