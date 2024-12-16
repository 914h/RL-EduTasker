"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: [
    "S1-CC1", "S1-CC2", "S2-CC1", "S2-CC2",
  "S3-CC1", "S3-CC2", "S4-CC1", "S4-CC2",
  "S5-CC1", "S5-CC2", "S6-CC1", "S6-CC2",
  ],
  datasets: [
    {
      label: "Total",
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 21)),
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
        label: (context) => `Marks: ${context.raw}`,
      },
    },
  },
  scales: {
  y: {
    grid: { drawBorder: false },
    ticks: {
      color: "#888888",
      font: { size: 12 },
      callback: (value) => `${value}`,
    },
    title: {
      display: true,
      text: "Marks",
      color: "#888888",
      font: { size: 14 },
    },
  },
},
};

export default function StudentOverview() {
  return (
    <div style={{ width: "100%", height: "350px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
