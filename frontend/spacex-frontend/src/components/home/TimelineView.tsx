import { Box, Divider, TablePagination } from "@mui/material";
import type { Launch } from "../../models/Launch";
import MissionTimeline from "./MissionTimeline";

interface Props {
  launches: Launch[];
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function TimelineView({
  launches,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  return (
    <Box sx={{ mt: 4 }}>
      <MissionTimeline launches={launches} />

      <Divider sx={{ my: 3 }} />

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[10, 20, 40]}
      />
    </Box>
  );
}
