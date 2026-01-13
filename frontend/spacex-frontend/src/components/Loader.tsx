import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
      }}
    >
      <CircularProgress />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Cargando lanzamientos...
      </Typography>
    </Box>
  );
}
