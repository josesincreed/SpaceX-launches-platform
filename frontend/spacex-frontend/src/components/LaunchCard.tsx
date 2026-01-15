import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import type { Launch } from "../models/Launch";

interface Props {
  launch: Launch;
}

function getStatusColor(status: string) {
  switch (status) {
    case "SUCCESS":
      return "success";
    case "FAILED":
      return "error";
    case "UPCOMING":
      return "warning";
    default:
      return "default";
  }
}

export default function LaunchCard({ launch }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        backgroundColor: "background.paper",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, transparent, rgba(30,136,229,0.08), transparent)",
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.4)",
          "&::before": {
            opacity: 1,
          },
        },
      }}
    >
      <CardContent>
        {/* MISSION NAME */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            letterSpacing: "0.04em",
            mb: 1,
          }}
        >
          {launch.mission_name}
        </Typography>

        {/* TAGS */}
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          <Chip
            label={launch.rocket_name}
            size="small"
            color="primary"
            sx={{ fontWeight: 500 }}
          />

          <Chip
            label={launch.status}
            size="small"
            color={getStatusColor(launch.status)}
            sx={{ fontWeight: 600 }}
          />
        </Stack>

        {/* DETAILS */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Fecha:</strong>{" "}
            {new Date(launch.launch_date).toLocaleString()}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <strong>Plataforma:</strong> {launch.launchpad}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
