import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Chart from "chart.js/auto";

const DataChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "stemmingen"));
      const data = querySnapshot.docs.map((doc) => doc.data());

      console.log("Fetched data from Firebase: ", data);

      // Verwerk de gegevens voor de grafiek
      const processedData = processData(data);
      console.log("Processed chart data: ", processedData);

      setChartData(processedData);
    };

    fetchData();
  }, []); // Zorg ervoor dat deze useEffect alleen bij de eerste render wordt uitgevoerd

  const processData = (data) => {
    const imageCounts = {
      "/images/cryingSmiley.png": 0,
      "/images/angrySmiley.png": 0,
      "/images/frowningSmiley.png": 0,
      "/images/wozySmiley.png": 0,
      "/images/sleepySmiley.png": 0,
      "/images/relievedSmiley.png": 0,
      "/images/heartsSmiley.png": 0,
      "/images/zonnebrilSmiley.png": 0,
      "/images/grinningSmiley.png": 0,
      "/images/zanySmiley.png": 0,
    };

    data.forEach((item) => {
      // Controleer of item.mood een geldige afbeeldingsbron is
      const imageSrc = Object.keys(imageCounts).find(
        (src) => src === `/images/${item.mood}.png`
      );

      if (imageSrc) {
        imageCounts[imageSrc]++;
      }
    });

    return Object.values(imageCounts);
  };

  useEffect(() => {
    if (chartData) {
      // Configureer de grafiek hier
      const ctx = document.getElementById("myChart").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Crying",
            "Angry",
            "Frowning",
            "Wozy",
            "Sleepy",
            "Relieved",
            "Hearts",
            "Zonnebril",
            "Grinning",
            "Zany",
          ],
          datasets: [
            {
              label: "# of Votes",
              data: chartData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default DataChart;
