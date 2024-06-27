import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Chart from "chart.js/auto";
import { getAuth } from "firebase/auth";

const DataChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "stemmingen"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());

        console.log("Fetched data from Firebase: ", data);

        // Process the data for the chart
        const processedData = processData(data);
        console.log("Processed chart data: ", processedData);

        setChartData(processedData);
      }
    };
useEffect(() => {
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
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Boos",
              data: chartData.map((day) => day[1]),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Niet blij",
              data: chartData.map((day) => day[2]),
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
            {
              label: "Wazig",
              data: chartData.map((day) => day[3]),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Moe",
              data: chartData.map((day) => day[4]),
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
            {
              label: "Opgelucht",
              data: chartData.map((day) => day[5]),
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
            {
              label: "Geliefd",
              data: chartData.map((day) => day[6]),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Cool",
              data: chartData.map((day) => day[7]),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Blij",
              data: chartData.map((day) => day[8]),
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
            {
              label: "Enthousiast",
              data: chartData.map((day) => day[9]),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
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

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default DataChart;
