import { Box, Grid, Typography, Fade } from "@mui/material";
import type { Launch } from "../models/Launch";
import LaunchCard from "./LaunchCard";

interface Props {
  launches: Launch[];
}

export default function LaunchList({ launches }: Props) {
  if (launches.length === 0) {
    return (
      <Fade in>
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ mb: 1, letterSpacing: "0.08em" }}
          >
            NO DATA AVAILABLE
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            No hay lanzamientos para mostrar con los filtros actuales
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {launches.map((launch) => (
          <Grid
            key={launch.launch_id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <LaunchCard launch={launch} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
