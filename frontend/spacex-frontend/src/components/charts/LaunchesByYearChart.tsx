import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
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
  const launchesByYear = launches.reduce<Record<string, number>>((acc, launch) => {
    const year = new Date(launch.launch_date).getFullYear().toString();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const years = Object.keys(launchesByYear).sort();
  const counts = years.map((year) => launchesByYear[year]);

  const data = {
    labels: years,
    datasets: [
      {
        label: "Lanzamientos por año",
        data: counts,
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.3)",
        tension: 0.3
      }
    ]
  };

  return <Line data={data} />;
}
