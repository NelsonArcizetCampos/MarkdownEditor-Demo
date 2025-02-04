import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// 1. Importe o ThemeProvider, CssBaseline e seu tema
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* 2. Envolva o App com ThemeProvider */}
    <ThemeProvider theme={theme}>
      {/* CssBaseline é opcional, mas dá um reset de estilos */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
