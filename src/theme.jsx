import { createTheme } from "@mui/material/styles";

const themeSettings = createTheme({
  palette: {
    primary: { main: "#fff" },
    secondary: { main: "#fff" },
    // text: {
    //   main: "#ffffff",
    //   // primary: "#f0f0f0",
    //   secondary: "#111111",
    // },
    bg: {
      white: "#fff",
      primary: "##30d5c80d",
      light: "#d8f5f3",
    },
    color: {
      peach: "#FCF2DE",
      blue: "#CBE2DD",
      primary: "#30D5C8",
      secondary: "#FFA500",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h0: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 62,
    },
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});

export default themeSettings;
