import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type ViewMode = "cards" | "table" | "charts";

interface Props {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeSelector({ value, onChange }: Props) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, v) => v && onChange(v)}
      sx={{ mb: 3 }}
    >
      <ToggleButton value="cards">Tarjetas</ToggleButton>
      <ToggleButton value="table">Tabla</ToggleButton>
      <ToggleButton value="charts">Gráficas</ToggleButton>
    </ToggleButtonGroup>
  );
}
