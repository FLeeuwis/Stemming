import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const DataChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = firebase.database().ref("stemmingen");
      dbRef.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const stemming = Object.values(data);
          setTemperatureData(stemming);
        }
      });
    };

    fetchData();

    // Clean up listener on unmount
    return () => firebase.database().ref("stemmingen").off("value");
  }, []);

  const data = {
    labels: stemmingData.map((_, index) => `Measurement ${index + 1}`),
    datasets: [
      {
        label: "Stemming",
        data: stemmingData,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default DataChart;
