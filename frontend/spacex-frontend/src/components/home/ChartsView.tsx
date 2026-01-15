import { Divider, Fade, Paper, Stack } from "@mui/material";
import type { Launch } from "../../models/Launch";
import { KpiCards } from "./KpiCards";
import LaunchesByStatusChart from "../charts/LaunchesByStatusChart";
import LaunchesByYearChart from "../charts/LaunchesByYearChart";

interface Props {
  launches: Launch[];
}

export function ChartsView({ launches }: Props) {
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <KpiCards launches={launches} />

      <Fade in>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Paper sx={{ p: 3, height: 380, flex: 1 }}>
            <LaunchesByStatusChart launches={launches} />
          </Paper>
          <Paper sx={{ p: 3, height: 380, flex: 1 }}>
            <LaunchesByYearChart launches={launches} />
          </Paper>
        </Stack>
      </Fade>
    </>
  );
}
