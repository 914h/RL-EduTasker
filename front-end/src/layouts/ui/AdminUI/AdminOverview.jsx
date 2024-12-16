
"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: [
    "Sep", "Oct", "Nov", "Dec",
    "Jan", "Feb", "Mar", "Apr",
    "May", "June", 
  ],
  datasets: [
    {
      label: "Total",
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)+ 100), // Random numbers from 0 to 20
      backgroundColor: "hsl(217.2 32.6% 17.5%)",
      borderRadius: 4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => `$${context.raw}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#888888", font: { size: 12 } },
    },
    y: {
      grid: { drawBorder: false },
      ticks: {
        color: "#888888",
        font: { size: 12 },
        callback: (value) => `${value} $`,
      },
    },
  },
};

export default function Overview() {
  return (
    <div style={{ width: "100%", height: "350px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
