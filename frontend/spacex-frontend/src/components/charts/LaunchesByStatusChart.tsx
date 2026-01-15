import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { Launch } from "../../models/Launch";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Props {
  launches: Launch[];
}

export default function LaunchesByStatusChart({ launches }: Props) {
  const statusCount = launches.reduce<Record<string, number>>(
    (acc, launch) => {
      acc[launch.status] = (acc[launch.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: "Launches",
        data: Object.values(statusCount),
        backgroundColor: [
          "#4caf50", // SUCCESS
          "#ff9800", // UPCOMING
          "#f44336", // FAILED
        ],
        borderRadius: 6,
        maxBarThickness: 60,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#121826",
        titleColor: "#ffffff",
        bodyColor: "#9aa4bf",
        borderColor: "rgba(30,136,229,0.4)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9aa4bf",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.06)",
        },
        ticks: {
          color: "#9aa4bf",
          precision: 0,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
