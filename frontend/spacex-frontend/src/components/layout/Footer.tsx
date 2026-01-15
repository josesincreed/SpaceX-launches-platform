import { Box, Typography, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        background:
          "linear-gradient(180deg, rgba(11,15,25,0) 0%, rgba(11,15,25,0.9) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Stack
        spacing={1}
        alignItems="center"
        sx={{ textAlign: "center" }}
      >
        <Typography
          variant="body2"
          sx={{ letterSpacing: "0.08em" }}
        >
          © {new Date().getFullYear()} SPACE X · LAUNCHES PLATFORM
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ letterSpacing: "0.12em" }}
        >
          Technical Challenge · AWS · Serverless · React
        </Typography>
      </Stack>
    </Box>
  );
}
