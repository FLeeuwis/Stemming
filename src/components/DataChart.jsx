// DataChart.jsx
import React from "react";
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
  TimeScale,
} from "chart.js";

import "chartjs-adapter-date-fns"; // Adapter voor tijdschalen

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Registreer de TimeScale
);

const DataChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.timestamp), // Pas dit aan naar jouw timestamp format
    datasets: [
      {
        label: "Stemming",
        data: data.map((item) => item.mood), // Pas dit aan naar jouw mood data
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Stemmingsdata",
      },
    },
    scales: {
      x: {
        type: "time", // Assuming timestamps are time-based
        time: {
          unit: "day", // Change this based on your data granularity
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default DataChart;
