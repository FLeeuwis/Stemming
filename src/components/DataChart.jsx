import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Chart from "chart.js/auto";

const DataChart = () => {
  const [chartData, setChartData] = useState(null);
  const [myChart, setMyChart] = useState(null);

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
      "/images/cryingSmiley.png": 1,
      "/images/angrySmiley.png": 2,
      "/images/frowningSmiley.png": 3,
      "/images/wozySmiley.png": 4,
      "/images/sleepySmiley.png": 5,
      "/images/relievedSmiley.png": 6,
      "/images/heartsSmiley.png": 7,
      "/images/zonnebrilSmiley.png": 8,
      "/images/grinningSmiley.png": 9,
      "/images/zanySmiley.png": 10,
    };

    data.forEach((item) => {
      const moodImage = `/images/${item.mood}.png`; // Assuming mood is a number corresponding to an index
      if (moodImage in imageCounts) {
        imageCounts[moodImage]++;
      }
    });

    return Object.values(imageCounts);
  };

  useEffect(() => {
    if (chartData && myChart) {
      myChart.data.datasets[0].data = chartData;
      myChart.update();
    }
  }, [chartData, myChart]);

  useEffect(() => {
    const ctx = document.getElementById("myChart");

    if (ctx && !myChart) {
      const chartInstance = new Chart(ctx, {
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
              data: chartData || [],
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

      setMyChart(chartInstance);
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [chartData, myChart]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "stemmingen"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());

        console.log("Fetched data from Firebase: ", data);

        // Process the data for the chart
        const processedData = processData(data);
        console.log("Processed chart data: ", processedData);

        setChartData(processedData);
      }
    );

    return () => unsubscribe();
  }, [db]);

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default DataChart;
