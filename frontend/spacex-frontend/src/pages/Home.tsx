import { useEffect, useState } from "react";
import { Box, Typography, Button, Collapse, Paper,} from "@mui/material";
import type { Launch } from "../models/Launch";
import {getAllLaunches,getLaunchesByStatus,getLaunchesByRocket,getLaunchesByLaunchpad,getLaunchesByDate,} from "../api/spacexApi";
import Loader from "../components/Loader";
import Filters from "../components/Filters";
import type { FiltersValues } from "../components/Filters";
import { HomeHeader } from "../components/home/HomeHeader";
import { SearchBar } from "../components/home/SearchBar";
import { ActiveFilters } from "../components/home/ActiveFilters";
import { ViewModeSelector } from "../components/home/ViewModeSelector";
import { CardsView } from "../components/home/CardsView";
import { TableView } from "../components/home/TableView";
import { ChartsView } from "../components/home/ChartsView";

type ViewMode = "cards" | "table" | "charts";

export default function Home() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [activeFilters, setActiveFilters] = useState<FiltersValues>({});

  async function loadData(fetcher: () => Promise<Launch[]>) {
    try {
      setLoading(true);
      setError(null);
      const data = await fetcher();
      setLaunches(data);
      setPage(0);
    } catch {
      setError("Error consultando lanzamientos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(getAllLaunches);
  }, []);

  // filtros
  
  function handleApplyFilters(filters: FiltersValues) {
    setActiveFilters(filters);
    setShowFilters(false);

    if (typeof filters.status === "string") {
      loadData(() => getLaunchesByStatus(filters.status!));
      return;
    }

    if (typeof filters.rocket === "string") {
      loadData(() => getLaunchesByRocket(filters.rocket!));
      return;
    }

    if (typeof filters.launchpad === "string") {
      loadData(() => getLaunchesByLaunchpad(filters.launchpad!));
      return;
    }

    if (
      typeof filters.date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(filters.date)
    ) {
      loadData(() => getLaunchesByDate(filters.date!));
      return;
    }

    loadData(getAllLaunches);
  }

  // search 
  const safeSearch = search.toLowerCase();
  const filterDate = activeFilters.date?.toLowerCase() ?? "";

  const filteredLaunches = launches.filter((launch) => {
    const formattedDate = new Date(launch.launch_date)
      .toLocaleDateString()
      .toLowerCase();

    const isoDate = launch.launch_date.toLowerCase();

    return (
      (
        launch.mission_name.toLowerCase().includes(safeSearch) ||
        launch.rocket_name.toLowerCase().includes(safeSearch) ||
        launch.launchpad.toLowerCase().includes(safeSearch) ||
        launch.status.toLowerCase().includes(safeSearch) ||
        formattedDate.includes(safeSearch) ||
        isoDate.includes(safeSearch)
      ) &&
      (!activeFilters.status ||
        launch.status === activeFilters.status) &&
      (!activeFilters.rocket ||
        launch.rocket_name === activeFilters.rocket) &&
      (!activeFilters.launchpad ||
        launch.launchpad === activeFilters.launchpad) &&
      (
        filterDate === "" ||
        isoDate.includes(filterDate) ||
        formattedDate.includes(filterDate)
      )
    );
  });

  // paginación
  const paginatedLaunches = filteredLaunches.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const hasActiveFilters =
    Object.keys(activeFilters).length > 0 || search.length > 0;

  // render
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      {/* HEADER */}
      <HomeHeader />

      {/* SEARCH */}
      <SearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(0);
        }}
      />

      {/* ACTIVE FILTERS */}
      <ActiveFilters
        filters={activeFilters}
        search={search}
      />

      {/* FILTER CONTROLS */}
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Button onClick={() => setShowFilters((v) => !v)}>
          {showFilters
            ? "Ocultar filtros"
            : "Mostrar filtros avanzados"}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="text"
            onClick={() => {
              setActiveFilters({});
              setSearch("");
              loadData(getAllLaunches);
            }}
          >
            Limpiar filtros
          </Button>
        )}
      </Box>

      <Collapse in={showFilters}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Filters
            onApply={handleApplyFilters}
            onClear={() => {}}
          />
        </Paper>
      </Collapse>

      {/* VIEW MODE */}
      <ViewModeSelector
        value={viewMode}
        onChange={setViewMode}
      />

      {/* VIEW DESCRIPTION */}
      {!loading && !error && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {viewMode === "cards" &&
            "Explora los lanzamientos mediante tarjetas visuales con información clave."}
          {viewMode === "table" &&
            "Vista detallada con información completa y opciones de paginación."}
          {viewMode === "charts" &&
            "Análisis visual de tendencias, estados y evolución de lanzamientos."}
        </Typography>
      )}

      {/* STATES */}
      {loading && <Loader />}
      {error && (
        <Typography color="error">
          {error}
        </Typography>
      )}

      {/* CONTENT */}
      {!loading && !error && viewMode === "cards" && (
        <CardsView
          launches={paginatedLaunches}
          total={filteredLaunches.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setPage(0);
          }}
        />
      )}

      {!loading && !error && viewMode === "table" && (
        <TableView
          launches={paginatedLaunches}
          total={filteredLaunches.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setPage(0);
          }}
        />
      )}

      {!loading && !error && viewMode === "charts" && (
        <ChartsView launches={filteredLaunches} />
      )}
    </Box>
  );
}
