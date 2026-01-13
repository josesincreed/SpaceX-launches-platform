import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
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
  const statusCount = launches.reduce<Record<string, number>>((acc, launch) => {
    acc[launch.status] = (acc[launch.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: "Lanzamientos",
        data: Object.values(statusCount),
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"]
      }
    ]
  };

  return <Bar data={data} />;
}
