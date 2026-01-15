import { Chip, Stack } from "@mui/material";
import type { FiltersValues } from "../Filters";

interface Props {
  filters: FiltersValues;
  search: string;
}

export function ActiveFilters({ filters, search }: Props) {
  const hasFilters =
    Object.keys(filters).length > 0 || search.length > 0;

  if (!hasFilters) return null;

  return (
    <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
      {filters.status && <Chip label={`Estado: ${filters.status}`} />}
      {filters.rocket && <Chip label={`Cohete: ${filters.rocket}`} />}
      {filters.launchpad && (
        <Chip label={`Plataforma: ${filters.launchpad}`} />
      )}
      {filters.date && <Chip label={`Fecha: ${filters.date}`} />}
      {search && <Chip label={`Buscar: ${search}`} />}
    </Stack>
  );
}
