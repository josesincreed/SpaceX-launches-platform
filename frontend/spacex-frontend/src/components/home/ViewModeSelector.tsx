import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import type { ViewMode } from "../../models/ViewMode";

interface Props {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

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
    >
    <ToggleButton value="cards">Tarjetas</ToggleButton>
    <ToggleButton value="table">Tabla</ToggleButton>
    <ToggleButton value="charts">Gráficas</ToggleButton>
    <ToggleButton value="timeline">Timeline</ToggleButton>
    </ToggleButtonGroup>

  );
}
