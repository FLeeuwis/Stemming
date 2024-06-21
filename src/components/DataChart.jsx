import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import Chart from "chart.js/auto";

const config = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  measurementId: "xxx",
};

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);
const valueRef = collection(db, "stemmingen"); // Verwijzing naar de 'stemmingen' collectie

const DataChart = () => {
  let myChart;

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Mood Data",
            data: [],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
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

    return () => {
      myChart.destroy(); // Optioneel: Vernietig de grafiek bij het ontmounten van het component
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(valueRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        addData(myChart, data.timestamp, data.mood);
      });
    });

    return () => unsubscribe(); // Stop met luisteren naar wijzigingen bij het ontmounten van het component
  }, [myChart]);

  function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default DataChart;
