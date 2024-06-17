import React, { useState } from "react";

const KeuzePagina = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const imageLijst = [
    { id: 1, src: "/public/images/cryingSmiley.png", alt: "afbeelding 1" },
    { id: 2, src: "/public/images/angrySmiley.png", alt: "afbeelding 2" },
    { id: 3, src: "/public/images/frowningSmiley.png", alt: "afbeelding 3" },
    { id: 4, src: "/public/images/wozySmiley.png", alt: "afbeelding 4" },
    { id: 5, src: "/public/images/sleepySmiley.png", alt: "afbeelding 5" },
    { id: 6, src: "/public/images/relievedSmiley.png", alt: "afbeelding 6" },
    { id: 7, src: "/public/images/heartsSmiley.png", alt: "afbeelding 7" },
    { id: 8, src: "/public/images/zonnebrilSmiley.png", alt: "afbeelding 8" },
    { id: 9, src: "/public/images/grinningSmiley.png", alt: "afbeelding 9" },
    { id: 10, src: "/public/images/zanySmiley.png", alt: "afbeelding 10" },
  ];

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Kies je stemming</h1>
      <div className="grid grid-cols-5 gap-4">
        {imageList.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="cursor-pointer rounded-lg shadow-md hover:shadow-xl"
            onClick={() => handleImageSelect(image)}
          />
        ))}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl mb-4">Selecteer je stemming</h2>
            <button
              onClick={handleClosePopUp}
              className="mt-4 bg-[#3B3939] text-white font-bold py-2 px-4 rounded hover:bg-[#343334]"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default KeuzePagina;
