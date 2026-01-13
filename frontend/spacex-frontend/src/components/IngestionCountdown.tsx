import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";

const INGEST_INTERVAL_MS = 6 * 60 * 60 * 1000;

function getNextExecutionTime() {
  const now = new Date();
  const base = new Date();
  base.setUTCHours(0, 0, 0, 0);

  const elapsed = now.getTime() - base.getTime();
  const next = Math.ceil(elapsed / INGEST_INTERVAL_MS) * INGEST_INTERVAL_MS;

  return new Date(base.getTime() + next);
}

export default function IngestionCountdown() {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const nextExecution = getNextExecutionTime();

    const interval = setInterval(() => {
      const diff = nextExecution.getTime() - Date.now();

      if (diff <= 0) {
        setRemaining("Actualizando datos...");
        return;
      }

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setRemaining(
        `${hours.toString().padStart(2, "0")}:` +
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        textAlign: "center",
        mb: 3,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.02)" }
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        Próxima actualización de lanzamientos en:
      </Typography>
      <Typography variant="h6">{remaining}</Typography>
    </Paper>
  );
}
