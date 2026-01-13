import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LOGO / TITLE */}
        <Typography variant="h6" fontWeight={600}>
          🚀 SpaceX Launches
        </Typography>

        {/* NAV */}
        <Box>
          <Button
            component={NavLink}
            to="/"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Home
          </Button>

          <Button
            component={NavLink}
            to="/about"
            color="inherit"
            sx={{ mx: 1 }}
          >
            About Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
