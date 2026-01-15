import { Box, Paper, Typography, Chip } from "@mui/material";
import type { Launch } from "../../models/Launch";
import type { Theme } from "@mui/material/styles";

interface Props {
  launch: Launch;
}

function getStatusColor(status: string, theme: Theme): string {
  switch (status) {
    case "SUCCESS":
      return theme.palette.success.main;
    case "FAILED":
      return theme.palette.error.main;
    case "UPCOMING":
      return theme.palette.warning.main;
    default:
      return theme.palette.grey[500];
  }
}

export default function TimelineItem({ launch }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
        pl: 4,
      }}
    >
      {/* Línea vertical */}
      <Box
        sx={{
          position: "absolute",
          left: 16,
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: "rgba(255,255,255,0.12)",
        }}
      />

      {/* Punto */}
      <Box
        sx={(theme) => ({
          position: "absolute",
          left: 9,
          top: 22,
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: getStatusColor(launch.status, theme),
          boxShadow: "0 0 10px rgba(30,136,229,0.7)",
          transition: "all 0.25s ease",
        })}
      />

      {/* Card */}
      <Paper
        sx={{
          width: "100%",
          ml: 4,
          p: 3,
          borderRadius: 3,
          transition: "all 0.25s ease",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 0 0 1px rgba(30,136,229,0.35), 0 16px 40px rgba(30,136,229,0.35)",
            background:
              "linear-gradient(135deg, rgba(30,136,229,0.18), rgba(0,0,0,0))",
          },
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {launch.mission_name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {new Date(launch.launch_date).toLocaleString()}
        </Typography>

        <Typography variant="body2">
          <strong>Cohete:</strong> {launch.rocket_name}
        </Typography>

        <Typography variant="body2">
          <strong>Plataforma:</strong> {launch.launchpad}
        </Typography>

        <Chip
          label={launch.status}
          size="small"
          color={
            launch.status === "SUCCESS"
              ? "success"
              : launch.status === "FAILED"
              ? "error"
              : "warning"
          }
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );
}
