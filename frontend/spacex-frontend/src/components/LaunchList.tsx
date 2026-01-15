import { Box, Typography, Fade } from "@mui/material";
import Grid from "@mui/material/Grid";
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
          <Typography variant="h6" sx={{ mb: 1, letterSpacing: "0.08em" }}>
            NO DATA AVAILABLE
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No hay lanzamientos para mostrar con los filtros actuales
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        spacing={3}
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          display: "grid",
        }}
      >
        {launches.map((launch) => (
          <Box key={launch.launch_id}>
            <LaunchCard launch={launch} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
