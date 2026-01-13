import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { Launch } from "../models/Launch";

interface Props {
    launch: Launch;
}

export default function LaunchCard({ launch }: Props) {
    return (
        <Card sx={{
            height: "100%",
            transition: "all 0.25s ease",
            cursor: "pointer",
            "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                backgroundColor: "#ffffff21"
            }
        }}>
            <CardContent>
                <Typography variant="h6">{launch.mission_name}</Typography>

                <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                    <Chip label={launch.rocket_name} color="primary" />
                    <Chip label={launch.status} />
                </Stack>

                <Typography variant="body2">
                    <strong>Fecha:</strong>{" "}
                    {new Date(launch.launch_date).toLocaleString()}
                </Typography>

                <Typography variant="body2">
                    <strong>Plataforma:</strong> {launch.launchpad}
                </Typography>
            </CardContent>


        </Card>
    );
}
