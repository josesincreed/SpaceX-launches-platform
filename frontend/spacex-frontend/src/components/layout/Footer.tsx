import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        py: 3,
        textAlign: "center",
        borderTop: "1px solid rgba(0,0,0,0.1)"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} SpaceX Launches Platform
      </Typography>

      <Typography variant="caption" color="text.secondary">
        Built as a technical challenge using AWS, Serverless & React
      </Typography>
    </Box>
  );
}
