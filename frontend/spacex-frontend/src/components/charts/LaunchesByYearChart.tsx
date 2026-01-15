import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import type { Launch } from "../../models/Launch";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Props {
  launches: Launch[];
}

export default function LaunchesByYearChart({ launches }: Props) {
  const launchesByYear = launches.reduce<Record<string, number>>(
    (acc, launch) => {
      const year = new Date(launch.launch_date)
        .getFullYear()
        .toString();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    },
    {}
  );

  const years = Object.keys(launchesByYear).sort();
  const counts = years.map((year) => launchesByYear[year]);

  const data = {
    labels: years,
    datasets: [
      {
        label: "Lanzamientos por año",
        data: counts,
        borderColor: "#1e88e5",
        backgroundColor: "rgba(30,136,229,0.25)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#1e88e5",
        pointBorderWidth: 2,
      },
    ],
  };


  const options: ChartOptions<"line"> = {
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

  return <Line data={data} options={options} />;
}
