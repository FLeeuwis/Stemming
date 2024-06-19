import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const imageSources = [
  "/images/cryingSmiley.png",
  "/images/angrySmiley.png",
  "/images/frowningSmiley.png",
  "/images/wozySmiley.png",
  "/images/sleepySmiley.png",
  "/images/relievedSmiley.png",
  "/images/heartsSmiley.png",
  "/images/zonnebrilSmiley.png",
  "/images/grinningSmiley.png",
  "/images/zanySmiley.png",
];

const Stemming = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const handleBoatClick = () => {
    navigate("/home");
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      setIsPopupOpen(true);
    } else {
      alert("Selecteer eerst een stemming.");
    }
  };

  const handleConfirm = async () => {
    try {
      const docRef = await addDoc(collection(db, "stemmingen"), {
        image: selectedImage,
        timestamp: new Date(),
      });
      console.log("Document toegevoegd met ID: ", docRef.id);
      alert("Stemming succesvol opgeslagen!");
      setSelectedImage(null);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Er is een fout opgetreden bij het opslaan van de stemming.");
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="h-screen bg-white flex flex-col justify-between relative">
      {/* Top sectie met Stemming en Logout */}
      <div className="flex flex-col items-center pt-10">
        <div className="font-koulen text-[74px] text-[#3B3939] mb-4">
          <h1>Stemming</h1>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-[#3B3939] text-white font-koulen py-2 px-4 rounded hover:bg-[#343334]"
          >
            Logout
          </button>
        </div>
        {/* Toegevoegde tekst */}
        <div className="w-full p-8 text-[15px] text-[#3B3939]  mx-auto text-center mt-4 font-trispace">
          <p>
            Muziek heeft een betoverend effect op onze emoties. Het heeft de
            kracht om ons op te vrolijken, te kalmeren, te troosten of zelfs
            nostalgisch te maken. Een vrolijk deuntje kan ons meteen energie
            geven en ons humeur verbeteren, terwijl een rustige melodie ons kan
            helpen ontspannen na een stressvolle dag.
          </p>
        </div>
      </div>

      {/* Emoji selectie sectie */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {imageSources.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`emoji-${index}`}
            className={`w-16 h-16 cursor-pointer ${
              selectedImage === src ? "border-4 rounded border-[#FFBE17]" : ""
            }`}
            onClick={() => handleImageClick(src)}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="py-2 px-4 bg-[#FFBE17] font-koulen text-[20px] text-white rounded self-center mb-2"
      >
        Versturen
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded shadow-lg">
            <h2 className="text-[20px] font-trispace mb-4 text-center text-[#3B3939]">
              Bevestig je keuze, deze kan hierna niet meer worden aangepast.
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleConfirm}
                className="py-2 px-4 bg-[#6F17FF] text-[25px] text-white font-koulen rounded"
              >
                Bevestigen
              </button>
              <button
                onClick={handleClosePopup}
                className="py-2 px-4 bg-[#FFBE17] text-[25px] text-white font-koulen rounded"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}

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
