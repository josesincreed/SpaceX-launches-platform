import { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

const INGEST_INTERVAL_MS = 6 * 60 * 60 * 1000;

function getNextExecutionTime() {
  const now = new Date();
  const base = new Date();
  base.setUTCHours(0, 0, 0, 0);

  const elapsed = now.getTime() - base.getTime();
  const next =
    Math.ceil(elapsed / INGEST_INTERVAL_MS) *
    INGEST_INTERVAL_MS;

  return new Date(base.getTime() + next);
}

export default function IngestionCountdown() {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const nextExecution = getNextExecutionTime();

    const interval = setInterval(() => {
      const diff =
        nextExecution.getTime() - Date.now();

      if (diff <= 0) {
        setRemaining("SYNC IN PROGRESS");
        return;
      }

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor(
        (diff % 3600000) / 60000
      );
      const seconds = Math.floor(
        (diff % 60000) / 1000
      );

      setRemaining(
        `${hours.toString().padStart(2, "0")}:` +
          `${minutes
            .toString()
            .padStart(2, "0")}:` +
          `${seconds
            .toString()
            .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      sx={{
        px: 3,
        py: 2,
        display: "inline-block",
        background:
          "linear-gradient(180deg, #121826, #0b0f19)",
        border: "1px solid rgba(30,136,229,0.25)",
        borderRadius: 3,
        boxShadow:
          "0 0 25px rgba(30,136,229,0.25)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 0 35px rgba(30,136,229,0.4)",
        },
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            letterSpacing: "0.14em",
            display: "block",
            mb: 0.5,
          }}
        >
          SIGUIENTE INGESTA AUTOMÁTICA
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontFamily: "monospace",
            letterSpacing: "0.12em",
          }}
        >
          {remaining}
        </Typography>
      </Box>
    </Paper>
  );
}
