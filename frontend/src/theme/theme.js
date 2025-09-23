// theme.js
import { createTheme } from "@mui/material/styles";

const colors = {
  primaryTeal: "#009688",
  primaryTealDark: "#00796B",
  secondaryCharcoal: "#263238",
  backgroundLight: "#ECEFF1",
  dividerGray: "#B0BEC5",
  errorRed: "#D32F2F",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryTeal,
      dark: colors.primaryTealDark,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: colors.secondaryCharcoal,
      contrastText: "#FFFFFF",
    },
    background: {
      default: colors.backgroundLight,
      paper: "#FFFFFF",
    },
    text: {
      primary: colors.secondaryCharcoal,
      secondary: "#546E7A",
    },
    divider: colors.dividerGray,
    error: {
      main: colors.errorRed,
    },
    // Add a teal key for easier reference
    teal: {
      main: colors.primaryTeal,
      dark: colors.primaryTealDark,
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontWeight: 700, color: colors.primaryTeal },
    h6: { fontWeight: 600, color: colors.secondaryCharcoal },
    body1: { color: colors.secondaryCharcoal },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: colors.primaryTeal,
          color: "#FFFFFF",
          "&:hover": { backgroundColor: colors.primaryTealDark },
        },
        outlinedSecondary: {
          borderColor: colors.secondaryCharcoal,
          color: colors.secondaryCharcoal,
          "&:hover": {
            backgroundColor: colors.backgroundLight,
            borderColor: colors.secondaryCharcoal,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: colors.primaryTeal,
          },
        },
      },
    },
  },
});

export default theme;
export { colors };
