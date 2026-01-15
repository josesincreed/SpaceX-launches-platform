import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <TextField
      fullWidth
      label="Buscar lanzamientos"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        mb: 3,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#121826",
          "& fieldset": {
            borderColor: "rgba(30,136,229,0.4)",
          },
          "&:hover fieldset": {
            borderColor: "#1e88e5",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1e88e5",
            borderWidth: 2,
          },
        },
      }}
    />
  );
}
