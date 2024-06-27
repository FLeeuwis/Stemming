import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithCustomToken,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

// Functie om Spotify te authenticeren
const authenticateWithSpotify = async (token) => {
  try {
    spotifyApi.setAccessToken(token);
    const userData = await spotifyApi.getMe();
    const customToken = await generateCustomToken(userData.id); // Genereer een custom token met een cloud function
    await signInWithCustomToken(auth, customToken);
    return userData;
  } catch (error) {
    console.error("Error authenticating with Spotify:", error);
    if (error.resonse && error.response.status === 401) {
      window.localStorage.removeItem("token");
      window.location.href = "/";
    }
  }
};

const InlogPagina = () => {
  const navigate = useNavigate();
  const client_id = "2af71b269cf04769896f82f33dfc07e1";
  const auth_endpoint = "https://accounts.spotify.com/authorize";
  const response_type = "token";
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const tokenFromHash = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"));
      if (tokenFromHash) {
        token = tokenFromHash.split("=")[1];
        window.location.hash = "";
        window.localStorage.setItem("token", token);
        setToken(token);
        authenticateWithSpotify(token);
      }
    } else if (token) {
      setToken(token);
      authenticateWithSpotify(token);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const addLightAnimation = () => {
      const lightAnimation = document.createElement("div");
      lightAnimation.classList.add("light-animation");

      const paarsGebiedWidth = window.innerWidth * (3 / 5);

      const randomLeft = Math.random() * window.innerHeight;
      const randomTop = Math.random() * paarsGebiedWidth;

      lightAnimation.style.backgroundColor = "#FFBE17";

      lightAnimation.style.left = `${randomLeft}px`;
      lightAnimation.style.top = `${randomTop}px`;

      document.body.appendChild(lightAnimation);

      lightAnimation.addEventListener("animationend", () => {
        lightAnimation.remove();
      });

      lightAnimation.classList.add("fade-out");
    };

    const addPhotoAnimation = () => {
      const photo = document.createElement("div");
      photo.classList.add("photo-animation");

      const paarsGebiedWidth = window.innerWidth * (3 / 5);

      const randomLeft = Math.random() * window.innerHeight;
      const randomTop = Math.random() * paarsGebiedWidth;

      const randomPhoto = getRandomPhoto();
      if (randomPhoto) {
        photo.style.backgroundImage = `url(${randomPhoto})`;

        photo.style.left = `${randomLeft}px`;
        photo.style.top = `${randomTop}px`;

        document.body.appendChild(photo);

        photo.addEventListener("animationend", () => {
          photo.remove();
        });

        photo.classList.add("fade-out");
      } else {
        console.error("geen fotos");
      }
    };

    const getRandomPhoto = () => {
      const photos = [
        "/images/angrySmiley.png",
        "/images/cryingSmiley.png",
        "/images/frowningSmiley.png",
        "/images/grinningSmiley.png",
        "/images/heartsSmiley.png",
        "/images/relievedSmiley.png",
        "/images/sleepySmiley.png",
        "/images/wozySmiley.png",
        "/images/zanySmiley.png",
        "/images/zonnebrilSmiley.png",
      ];

      return photos.length > 0
        ? photos[Math.floor(Math.random() * photos.length)]
        : null;
    };

    const intervalId = setInterval(() => {
      // Randomly decide whether to add a light animation or a photo animation
      if (Math.random() < 0.5) {
        addLightAnimation();
      } else {
        addPhotoAnimation();
      }
    }, 500); // Add an animation

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const handleLogin = () => {
    const redirect_uri = "https://stemming.vercel.app/";
    const encodedRedirectUri = encodeURIComponent(redirect_uri);
    const authUrl = `${auth_endpoint}?client_id=${client_id}&redirect_uri=${encodedRedirectUri}&response_type=${response_type}`;

    window.location.href = authUrl;
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-5">
      {/* Paars gedeelte */}
      <div className="col-span-3 bg-[#6F17FF]"></div>

      {/* Witte gedeelte met de tekst "STEMMING" */}
      <div className="col-span-2 bg-white grid grid-rows-7">
        <div className="row-span-1"></div>
        <div className=" row-span-1 flex justify-center items-center">
          <h1 className="text-[74px] font-bold mb-8 text-[#3B3939] font-koulen">
            STEMMING
          </h1>
        </div>
        <div className="row-span-1 flex flex-col items-center">
          {!token ? (
            <>
              <button
                onClick={handleLogin}
                className="py-2 px-4 bg-[#3B3939] text-white font-trispace rounded-lg shadow-md hover:shadow-xl"
              >
                Login met Spotify
              </button>{" "}
              <p className="text-[#3B3939] font-trispace text-[10px] m-2 text-center">
                Begin nu en ervaar een gepersonaliseerde muzikale reis!
              </p>
            </>
          ) : (
            <div>
              <p>Je bent ingelogd met Spotify</p>
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-[#3B3939] text-white font-trispace rounded-lg shadow-md hover:shadow-xl mt-4"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="row-span-1 font-trispace text-[15px] text-[#3B3939] flex justify-center items-center text-center px-4">
          <p>
            Welkom bij Stemming, de muziek die zich afstemt op jouw gevoel!
            Ontdek de kracht van muziek en laat Stemming jouw dag verbeteren.
          </p>
        </div>
        {/* <div className="row-span-1"></div> */}
        {/* Footer */}
        <footer className=" flex justify-center items-center text-center text-[#3B3939] text-[9px] font-koulen">
          © 2024 Stemming. Alle rechten voorbehouden.
        </footer>
      </div>
    </div>
  );
};

export default InlogPagina;
