import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Typography
} from "@mui/material";
import type { Launch } from "../models/Launch";

interface Props {
    launches: Launch[];
}

export default function LaunchTable({ launches }: Props) {
    if (launches.length === 0) {
        return (
            <Typography variant="body1" sx={{ mt: 3 }}>
                No hay lanzamientos para mostrar
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
                <TableHead>
                    <TableRow 
                        sx={{
                            transition: "all 0.25s ease",
                            "&:hover": {
                                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                                backgroundColor: "rgba(255, 255, 255, 0.05)"
                            }
                        }}>
                        <TableCell>Misión</TableCell>
                        <TableCell>Cohete</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Plataforma</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {launches.map((launch) => (
                        <TableRow hover
                            sx={{
                                transition: "background-color 0.2s ease",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.05)"
                                }
                            }} key={launch.launch_id}>
                            <TableCell>{launch.mission_name}</TableCell>
                            <TableCell>{launch.rocket_name}</TableCell>
                            <TableCell>
                                <Chip
                                    label={launch.status}
                                    color={
                                        launch.status === "SUCCESS"
                                            ? "success"
                                            : launch.status === "FAILED"
                                                ? "error"
                                                : "warning"
                                    }
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {new Date(launch.launch_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{launch.launchpad}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
