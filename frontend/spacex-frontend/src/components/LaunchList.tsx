import { Box, Grid, Typography } from "@mui/material";
import type { Launch } from "../models/Launch";
import LaunchCard from "./LaunchCard";

interface Props {
  launches: Launch[];
}

export default function LaunchList({ launches }: Props) {
  if (launches.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 4 }}>
        No hay lanzamientos para mostrar
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {launches.map((launch) => (
          <Grid key={launch.launch_id}>
            <LaunchCard launch={launch} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
