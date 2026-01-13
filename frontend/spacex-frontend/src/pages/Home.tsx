import { useEffect, useState } from "react";
import {Box, Typography, Divider, ToggleButton, ToggleButtonGroup, Button, TextField, Collapse, TablePagination, Chip,Stack,Paper,Fade} from "@mui/material";
import type { Launch } from "../models/Launch";
import { getAllLaunches, getLaunchesByStatus,getLaunchesByRocket,getLaunchesByLaunchpad,getLaunchesByDate} from "../api/spacexApi";
import LaunchList from "../components/LaunchList";
import LaunchTable from "../components/LaunchTable";
import LaunchesByStatusChart from "../components/charts/LaunchesByStatusChart";
import LaunchesByYearChart from "../components/charts/LaunchesByYearChart";
import Loader from "../components/Loader";
import Filters from "../components/Filters";
import type { FiltersValues } from "../components/Filters";
import IngestionCountdown from "../components/IngestionCountdown";

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

    function handleApplyFilters(filters: FiltersValues) {
        setActiveFilters(filters);
        setShowFilters(false);

        if (typeof filters.status === "string") {
            const status = filters.status!;
            loadData(() => getLaunchesByStatus(status));
            return;
        }

        if (typeof filters.rocket === "string") {
            const rocket = filters.rocket!;
            loadData(() => getLaunchesByRocket(rocket));
            return;
        }

        if (typeof filters.launchpad === "string") {
            const launchpad = filters.launchpad!;
            loadData(() => getLaunchesByLaunchpad(launchpad));
            return;
        }

        if (
            typeof filters.date === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(filters.date)
        ) {
            const date = filters.date!;
            loadData(() => getLaunchesByDate(date));
            return;
        }

        loadData(getAllLaunches);
    }

    const safeSearch = search.toLowerCase();
    const filterDate = activeFilters.date?.toLowerCase();
    const fd = filterDate ?? "";

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
            (!activeFilters.status || launch.status === activeFilters.status) &&
            (!activeFilters.rocket || launch.rocket_name === activeFilters.rocket) &&
            (!activeFilters.launchpad || launch.launchpad === activeFilters.launchpad) &&
            (fd === "" ||
                isoDate.includes(fd) ||
                formattedDate.includes(fd))
        );
    });

    const paginatedLaunches = filteredLaunches.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const hasActiveFilters =
        Object.keys(activeFilters).length > 0 || search.length > 0;

    // KPIs
    const totalLaunches = filteredLaunches.length;
    const successCount = filteredLaunches.filter(
        (l) => l.status === "SUCCESS"
    ).length;
    const successRate =
        totalLaunches > 0
            ? Math.round((successCount / totalLaunches) * 100)
            : 0;

    const lastLaunch = filteredLaunches[0];

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
            {/* HEADER */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h3" fontWeight={600}>
                    🚀 SpaceX Launches
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Making life multiplanetary
                </Typography>
            </Box>

            <TextField
                fullWidth
                label="Buscar lanzamientos"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                }}
                sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "rgb(7, 104, 250)"
                        },
                        "&:hover fieldset": {
                            borderColor: "rgb(7, 104, 250)"
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "rgb(7, 104, 250)",
                            borderWidth: 2
                        }
                    },
                    "& .MuiInputLabel-root": {
                        color: "rgb(255, 255, 255)"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "rgb(7, 104, 250)"
                    }
                }}
            />

            <IngestionCountdown />


            {hasActiveFilters && (
                <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
                    {activeFilters.status && <Chip label={`Estado: ${activeFilters.status}`} />}
                    {activeFilters.rocket && <Chip label={`Cohete: ${activeFilters.rocket}`} />}
                    {activeFilters.launchpad && <Chip label={`Plataforma: ${activeFilters.launchpad}`} />}
                    {activeFilters.date && <Chip label={`Fecha: ${activeFilters.date}`} />}
                    {search && <Chip label={`Buscar: ${search}`} />}
                </Stack>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Button onClick={() => setShowFilters((v) => !v)}>
                    {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
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
            </Stack>

            <Collapse in={showFilters}>
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Filters onApply={handleApplyFilters} onClear={() => { }} />
                </Paper>
            </Collapse>

            <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, v) => v && setViewMode(v)}
                sx={{
                    mb: 2,
                    "& .MuiToggleButton-root": {
                        textTransform: "none",
                        px: 3,
                        transition: "all 0.25s ease"
                    },
                    "& .MuiToggleButton-root.Mui-selected": {
                        backgroundColor: "rgb(7, 104, 250)",
                        fontWeight: 600,
                        "&:hover": {
                            backgroundColor: "rgba(0, 128, 255, 0.4)"
                        }
                    }
                }}
            >
                <ToggleButton value="cards">Tarjetas</ToggleButton>
                <ToggleButton value="table">Tabla</ToggleButton>
                <ToggleButton value="charts">Gráficas</ToggleButton>
            </ToggleButtonGroup>


            {/* DESCRIPCIÓN POR VISTA */}
            {!loading && !error && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {viewMode === "cards" &&
                        "Explora los lanzamientos mediante tarjetas visuales con información clave."}
                    {viewMode === "table" &&
                        "Vista tabular con detalles completos y opciones de paginación."}
                    {viewMode === "charts" &&
                        "Análisis visual de tendencias, estados y evolución de lanzamientos."}
                </Typography>
            )}

            {loading && <Loader />}
            {error && <Typography color="error">{error}</Typography>}

            {/* CARDS */}
            {!loading && !error && viewMode === "cards" && (
                <>
                    <Fade in>
                        <Box>
                            <LaunchList launches={paginatedLaunches} />
                        </Box>
                    </Fade>
                    <Divider sx={{ my: 2 }} />
                    <TablePagination
                        component="div"
                        count={filteredLaunches.length}
                        page={page}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[10, 20, 40, 100]}
                    />
                </>
            )}

            {/* TABLE */}
            {!loading && !error && viewMode === "table" && (
                <>
                    <Fade in>
                        <Box>
                            <LaunchTable launches={paginatedLaunches} />
                        </Box>
                    </Fade>
                    <Divider sx={{ my: 2 }} />
                    <TablePagination
                        component="div"
                        count={filteredLaunches.length}
                        page={page}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[10, 20, 40, 100]}
                    />
                </>
            )}

            {/* CHARTS + KPIs */}
            {!loading && !error && viewMode === "charts" && (
                <>
                    <Divider sx={{ my: 3 }} />

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
                        <Paper sx={{
                            p: 2,
                            flex: 1,
                            transition: "all 0.25s ease",
                            "&:hover": {
                                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                                backgroundColor: "rgb(7, 104, 250)"
                            }
                        }}>
                            <Typography variant="subtitle2">Total lanzamientos</Typography>
                            <Typography variant="h5">{totalLaunches}</Typography>
                        </Paper>
                        <Paper sx={{
                            p: 2,
                            flex: 1,
                            transition: "all 0.25s ease",
                            "&:hover": {
                                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                                backgroundColor: "rgb(7, 104, 250)"
                            }
                        }}>
                            <Typography variant="subtitle2">Tasa de éxito</Typography>
                            <Typography variant="h5">{successRate}%</Typography>
                        </Paper>
                        <Paper sx={{
                            p: 2,
                            flex: 1,
                            transition: "all 0.25s ease",
                            "&:hover": {
                                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                                backgroundColor: "rgb(7, 104, 250)"
                            }
                        }}>
                            <Typography variant="subtitle2">Último lanzamiento</Typography>
                            <Typography variant="body1">
                                {lastLaunch?.mission_name ?? "—"}
                            </Typography>
                        </Paper>
                    </Stack>

                    <Fade in>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                            <Paper sx={{
                                p: 2,
                                height: 350,
                                flex: 1,
                                transition: "all 0.25s ease",
                                "&:hover": {
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
                                    transform: "translateY(-4px)",

                                }
                            }}>
                                <LaunchesByStatusChart launches={filteredLaunches} />
                            </Paper>
                            <Paper sx={{
                                p: 2,
                                height: 350,
                                flex: 1,
                                transition: "all 0.25s ease",
                                "&:hover": {
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
                                    transform: "translateY(-4px)",

                                }
                            }}>
                                <LaunchesByYearChart launches={filteredLaunches} />
                            </Paper>
                        </Stack>
                    </Fade>
                </>
            )}
        </Box>
    );
}
