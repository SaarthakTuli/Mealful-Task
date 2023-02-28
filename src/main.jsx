import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ContextProvider } from "./context/ContextProvider";

import { registerLicense } from "@syncfusion/ej2-base";
import { syncfusionLicense } from "../config.js";
import { ThemeProvider } from "@mui/material";
import themeSettings from "./theme";

registerLicense(syncfusionLicense);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={themeSettings}>
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
