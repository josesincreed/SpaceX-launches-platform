import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import type { Launch } from "../models/Launch";

interface Props {
  launches: Launch[];
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

export default function LaunchTable({ launches }: Props) {
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
    <Fade in>
      <TableContainer
        component={Paper}
        sx={{
          mt: 4,
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background:
                  "linear-gradient(90deg, rgba(30,136,229,0.15), rgba(30,136,229,0.05))",
              }}
            >
              <TableCell>Misión</TableCell>
              <TableCell>Cohete</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Plataforma</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {launches.map((launch) => (
              <TableRow
                key={launch.launch_id}
                hover
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.04)",
                  },
                }}
              >
                <TableCell>
                  <Typography fontWeight={500}>
                    {launch.mission_name}
                  </Typography>
                </TableCell>

                <TableCell>
                  {launch.rocket_name}
                </TableCell>

                <TableCell>
                  <Chip
                    label={launch.status}
                    size="small"
                    color={getStatusColor(launch.status)}
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>

                <TableCell>
                  {new Date(
                    launch.launch_date
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  {launch.launchpad}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fade>
  );
}
