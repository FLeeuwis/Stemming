import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Hook om afbeeldingen vooraf te laden
const usePreloadImages = (srcArray) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadedImages = srcArray.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    setImages(loadedImages);
  }, [srcArray]);

  return images;
};

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

const Home = () => {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const images = usePreloadImages(imageSources);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const handleBoatClick = () => {
    navigate("/keuzepagina");
  };

  function getLastNDays(count) {
    const daysOfWeek = [
      "zondag",
      "maandag",
      "dinsdag",
      "woensdag",
      "donderdag",
      "vrijdag",
      "zaterdag",
    ];

    const days = [];
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = daysOfWeek[date.getDay()];
      days.push(dayName);
    }
    return days.reverse();
  }

  const labels = getLastNDays(7);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "oelalal",
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // Corresponding to the number of images
        fill: false,
        borderColor: "#FFBE17",
        backgroundColor: "#FFBE17",
        tension: 0.1,
      },
    ],
  };

  const drawImagePlugin = {
    id: "drawImagePlugin",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const yAxis = chart.scales.y;

      images.forEach((img, index) => {
        if (!img.complete) {
          console.error(`Afbeelding ${index} is niet geladen.`);
          return; // Skip drawing if image is not loaded
        }
        const y = yAxis.getPixelForValue(index);
        const x = yAxis.left - 40; // Adjust the x position as needed
        console.log(`Tekenen afbeelding ${index} op (${x}, ${y})`);
        ctx.drawImage(img, x, y - 15, 30, 30);
      });
    },
  };

  const options = {
    plugins: {
      drawImagePlugin: {},
    },
    scales: {
      y: {
        ticks: {
          callback: function () {
            // Return empty string to avoid default number rendering
            return "";
          },
        },
      },
    },
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
            <Line
              ref={chartRef}
              data={data}
              options={options}
              plugins={[drawImagePlugin]}
            />
          </div>
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
