import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const Chart2 = ({ currencySymbol, arr, days }) => {
  const date = [];
  const prices = [];
  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: `price in ${currencySymbol}`,
        data: prices,
      },
    ],
  };
  console.log(prices);
  return <Line options={{ responsive: true }} data={data} />;
};

export default Chart2;
