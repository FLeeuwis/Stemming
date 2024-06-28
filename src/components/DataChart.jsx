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
    const daysOfWeek = [
      "Zondag",
      "Maandag",
      "Dinsdag",
      "Woensdag",
      "Donderdag",
      "Vrijdag",
      "Zaterdag",
    ];
    const moodCounts = daysOfWeek.map(() => ({
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
    }));

    data.forEach((item, index) => {
      console.log(`Processing item at index ${index}:`, item);
      if (
        item &&
        item.timestamp &&
        typeof item.mood !== "undefined" &&
        item.mood !== null
      ) {
        const date = new Date(item.timestamp.seconds * 1000); // Assuming Firestore timestamp
        const day = date.getDay(); // Get day of the week (0-6)
        if (moodCounts[day] && item.mood in moodCounts[day]) {
          moodCounts[day][item.mood]++;
        } else {
          console.warn(`Unexpected mood value at index ${index}:`, item.mood);
        }
      } else {
        console.warn(`Invalid item at index ${index}:`, item);
      }
    });

    return moodCounts.map((moodCount) => Object.values(moodCount));
  };

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById("myChart").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Zondag",
            "Maandag",
            "Dinsdag",
            "Woensdag",
            "Donderdag",
            "Vrijdag",
            "Zaterdag",
          ],
          datasets: [
            {
              label: "Verdrietig",
              data: chartData.map((day) => day[0]),
              backgroundColor: "rgba(112, 208, 249, 0.2)",
              borderColor: "rgba(112, 208, 249, 1)",
              borderWidth: 1,
            },
            {
              label: "Boos",
              data: chartData.map((day) => day[1]),
              backgroundColor: "rgba(159, 13, 13, 0.2)",
              borderColor: "rgba(159, 13, 13, 1)",
              borderWidth: 1,
            },
            {
              label: "Niet blij",
              data: chartData.map((day) => day[2]),
              backgroundColor: "rgba(255, 134, 23, 0.2)",
              borderColor: "rgba(255, 134, 23, 1)",
              borderWidth: 1,
            },
            {
              label: "Wazig",
              data: chartData.map((day) => day[3]),
              backgroundColor: "rgba(250, 255, 23, 0.2)",
              borderColor: "rgba(250, 255, 23, 1)",
              borderWidth: 1,
            },
            {
              label: "Moe",
              data: chartData.map((day) => day[4]),
              backgroundColor: "rgba(255, 23, 246, 0.2)",
              borderColor: "rgba(255, 23, 246, 1)",
              borderWidth: 1,
            },
            {
              label: "Opgelucht",
              data: chartData.map((day) => day[5]),
              backgroundColor: "rgba(23, 255, 144, 0.2)",
              borderColor: "rgba(23, 255, 144, 1)",
              borderWidth: 1,
            },
            {
              label: "Geliefd",
              data: chartData.map((day) => day[6]),
              backgroundColor: "rgba(255, 23, 23, 0.2)",
              borderColor: "rgba(255, 23, 23, 1)",
              borderWidth: 1,
            },
            {
              label: "Cool",
              data: chartData.map((day) => day[7]),
              backgroundColor: "rgba(23, 60, 255, 0.2)",
              borderColor: "rgba(23, 60, 255, 1)",
              borderWidth: 1,
            },
            {
              label: "Blij",
              data: chartData.map((day) => day[8]),
              backgroundColor: "rgba(111, 23, 255, 0.2)",
              borderColor: "rgba(111, 23, 225, 1)",
              borderWidth: 1,
            },
            {
              label: "Enthousiast",
              data: chartData.map((day) => day[9]),
              backgroundColor: "rgba(255, 190, 23, 0.2)",
              borderColor: "rgba(225, 190, 23, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  // Custom labels for the y-axis
                  const labels = {
                    0: "",
                    1: "",
                    2: "",
                  };
                  return labels[value] || "";
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return <canvas id="myChart"></canvas>;
};

export default DataChart;
