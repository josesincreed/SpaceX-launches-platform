import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(11,15,25,0.8)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO / BRAND */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            SPACE X
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: "2px" }}
          >
            LAUNCH CONTROL
          </Typography>
        </Box>

        {/* NAV */}
        <Box>
          <NavButton to="/" label="Home" />
          <NavButton to="/about" label="About" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// NAV BUTTON (REUSABLE)
interface NavButtonProps {
  to: string;
  label: string;
}

function NavButton({ to, label }: NavButtonProps) {
  return (
    <Button
      component={NavLink}
      to={to}
      sx={{
        mx: 1,
        color: "text.secondary",
        fontWeight: 500,
        textTransform: "none",
        letterSpacing: "0.08em",
        position: "relative",
        "&.active": {
          color: "primary.main",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -4,
            left: "20%",
            width: "60%",
            height: 2,
            backgroundColor: "primary.main",
            borderRadius: 1,
          },
        },
        "&:hover": {
          color: "primary.main",
          backgroundColor: "transparent",
        },
      }}
    >
      {label}
    </Button>
  );
}
