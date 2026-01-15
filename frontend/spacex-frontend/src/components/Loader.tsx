import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress
        size={48}
        thickness={4}
        sx={{
          color: "primary.main",
        }}
      />

      <Typography
        variant="subtitle2"
        sx={{
          letterSpacing: "0.12em",
        }}
      >
        LOADING TELEMETRY
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        Cargando datos de lanzamientos espaciales
      </Typography>
    </Box>
  );
}
