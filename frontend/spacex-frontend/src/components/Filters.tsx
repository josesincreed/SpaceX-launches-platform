import {
  Box,
  Button,
  MenuItem,
  TextField,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";

export interface FiltersValues {
  status?: string;
  rocket?: string;
  launchpad?: string;
  date?: string;
}

interface Props {
  onApply: (filters: FiltersValues) => void;
  onClear: () => void;
}

export default function Filters({ onApply, onClear }: Props) {
  const [status, setStatus] = useState("");
  const [rocket, setRocket] = useState("");
  const [launchpad, setLaunchpad] = useState("");
  const [date, setDate] = useState("");

  function handleApply() {
    onApply({
      status: status || undefined,
      rocket: rocket || undefined,
      launchpad: launchpad || undefined,
      date: date || undefined,
    });
  }

  function handleClear() {
    setStatus("");
    setRocket("");
    setLaunchpad("");
    setDate("");
    onClear();
  }

  return (
    <Box>
      {/* HEADER */}
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          letterSpacing: "0.12em",
        }}
      >
        ADVANCED FILTERS
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* FILTER CONTROLS */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        flexWrap="wrap"
      >
        <TextField
          select
          size="small"
          label="Estado"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="SUCCESS">SUCCESS</MenuItem>
          <MenuItem value="FAILED">FAILED</MenuItem>
          <MenuItem value="UPCOMING">UPCOMING</MenuItem>
        </TextField>

        <TextField
          size="small"
          label="Cohete"
          placeholder="FALCON 9"
          value={rocket}
          onChange={(e) => setRocket(e.target.value)}
          sx={{ minWidth: 180 }}
        />

        <TextField
          size="small"
          label="Plataforma"
          placeholder="CCSFS SLC 40"
          value={launchpad}
          onChange={(e) => setLaunchpad(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <TextField
          size="small"
          label="Fecha"
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ minWidth: 150 }}
        />

        {/* ACTIONS */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ ml: { md: "auto" } }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={handleClear}
            sx={{ textTransform: "none" }}
          >
            Limpiar
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={handleApply}
            sx={{ textTransform: "none" }}
          >
            Aplicar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
