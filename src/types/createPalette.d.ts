import * as createPalette from "@material-ui/core/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    themeText: ThemeTextPaletteColor;
    themeBase: ThemeBasePaletteColor;
    themeRubik: ThemeRubikPaletteColor;
  }

  interface PaletteOptions {
    themeText?: ThemeTextPaletteColorOptions;
    themeBase?: ThemeBasePaletteColorOptions;
    themeRubik: ThemeRubikPaletteColorOptions;
  }

  interface ThemeTextPaletteColorOptions {
    primary?: string;
    secondary?: string;
  }
  interface ThemeTextPaletteColor {
    primary: string;
    secondary: string;
  }

  interface ThemeBasePaletteColorOptions {
    primary?: string;
    primaryAlpha?: string;
    secondary?: string;
    secondaryAlpha?: string;
    red?: string;
    blue?: string;
    green?: string;
    white?: string;
    black?: string;
    bgGray?: string;
  }
  interface ThemeBasePaletteColor {
    primary: string;
    primaryAlpha: string;
    secondary: string;
    secondaryAlpha: string;
    red: string;
    blue: string;
    green: string;
    white: string;
    black: string;
    bgGray: string;
  }

  interface ThemeRubikPaletteColorOptions {
    green?: string;
    red?: string;
    yellow?: string;
    white?: string;
    orange?: string;
    blue?: string;
    black?: string;
    gray?: string;
  }
  interface ThemeRubikPaletteColor {
    green: string;
    red: string;
    yellow: string;
    white: string;
    orange: string;
    blue: string;
    black: string;
    gray: string;
  }
}
