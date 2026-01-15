import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1e88e5",
    },
    background: {
      default: "#0b0f19",
      paper: "#121826",
    },
    text: {
      primary: "#ffffff",
      secondary: "#9aa4bf",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: "0.08em",
    },
    subtitle1: {
      letterSpacing: "0.12em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 14,
  },
});
