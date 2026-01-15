import { Box, Typography } from "@mui/material";
import IngestionCountdown from "../IngestionCountdown";

export function HomeHeader() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 6,
        py: 4,
        borderRadius: 4,
        background:
          "linear-gradient(180deg, #121826 0%, #0b0f19 100%)",
        boxShadow: "0 0 40px rgba(30,136,229,0.15)",
      }}
    >
      <Typography variant="h3">
        SPACE X · LAUNCH CONTROL
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        Making life multiplanetary
      </Typography>

      <Box mt={3}>
        <IngestionCountdown />
      </Box>
    </Box>
  );
}
