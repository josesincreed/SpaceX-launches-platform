import { Paper, Stack, Typography } from "@mui/material";
import type { Launch } from "../../models/Launch";

interface Props {
  launches: Launch[];
}

export function KpiCards({ launches }: Props) {
  const total = launches.length;
  const success = launches.filter(l => l.status === "SUCCESS").length;
  const rate = total ? Math.round((success / total) * 100) : 0;
  const last = launches[0];

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>
      {[["Total lanzamientos", total],
        ["Tasa de éxito", `${rate}%`],
        ["Próximo lanzamiento", last?.mission_name ?? "—"]
      ].map(([label, value]) => (
        <Paper
          key={label}
          sx={{
            p: 3,
            flex: 1,
            transition: "all .3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 15px 40px rgba(30,136,229,.25)",
            },
          }}
        >
          <Typography variant="subtitle2">{label}</Typography>
          <Typography variant="h5">{value}</Typography>
        </Paper>
      ))}
    </Stack>
  );
}
