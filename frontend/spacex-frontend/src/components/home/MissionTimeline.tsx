import { Box, Stack } from "@mui/material";
import type { Launch } from "../../models/Launch";
import TimelineItem from "./TimelineItem";

interface Props {
  launches: Launch[];
}

export default function MissionTimeline({ launches }: Props) {
  if (launches.length === 0) return null;

  // Orden cronológico: más recientes primero
  const sorted = [...launches].sort(
    (a, b) =>
      new Date(b.launch_date).getTime() -
      new Date(a.launch_date).getTime()
  );

  return (
    <Box sx={{ position: "relative", mt: 2 }}>
      <Stack spacing={3}>
        {sorted.map((launch) => (
          <TimelineItem
            key={launch.launch_id}
            launch={launch}
          />
        ))}
      </Stack>
    </Box>
  );
}
