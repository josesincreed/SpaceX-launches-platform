import { Box, Divider, Fade, TablePagination } from "@mui/material";
import type { Launch } from "../../models/Launch";
import LaunchList from "../LaunchList";

interface Props {
  launches: Launch[];
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export function CardsView({
  launches,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 3,
        p: 2,
      }}
    >
      <Fade in>
        <Box>
          <LaunchList launches={launches} />
        </Box>
      </Fade>

      <Divider sx={{ my: 2 }} />

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[10, 20, 40, 100]}
      />
    </Box>
  );
}
