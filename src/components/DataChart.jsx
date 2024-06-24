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

      // Process the data for the chart
      const processedData = processData(data);
      console.log("Processed chart data: ", processedData);

      setChartData(processedData);
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const imageCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    };

    data.forEach((item) => {
      if (item.mood in imageCounts) {
        imageCounts[item.mood]++;
      }
    });

    return Object.values(imageCounts);
  };

  useEffect(() => {
    if (chartData) {
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
            "Loved",
            "Cool",
            "Grinning",
            "Zany",
          ],
          datasets: [
            {
              label: "Hoe voel ik mij?",
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
