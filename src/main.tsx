import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const theme = createTheme({
  typography: {
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
  },
  palette: {
    themeText: {
      primary: "#242424",
      secondary: "#a7a6a6",
    },
    themeBase: {
      primary: "#54A4CD",
      primaryAlpha: "rgb(84, 164, 205, 0.4)",
      secondary: "#FF892C",
      secondaryAlpha: "rgb(255, 137, 46, 0.6)",
      red: "#EC4C33",
      blue: "#3985ab",
      green: "#9EDD00",
      white: "#FFFFFF",
      black: "#000000",
    },
    themeRubik: {
      green: "#188a28",
      red: "#f80208",
      yellow: "#fdde02",
      white: "#ffffff",
      orange: "#ff8005",
      blue: "#004ac3",
      black: "#524d4d",
      gray: "#777777",
    },
    text: {
      primary: "#242424",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={`${import.meta.env.VITE_BASE_URL}`}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
