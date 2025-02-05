// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9900', // Laranja AWS
      light: '#FFB84D', // tom mais claro, se precisar
      dark: '#CC7A00', // tom mais escuro para hover
      contrastText: '#FFF',
    },
    secondary: {
      main: '#232F3E', // Cinza-escuro azulado
      contrastText: '#FFF',
    },
    background: {
      default: '#F3F3F3', // fundo principal
      paper: '#FFFFFF', // fundo de cards e surfaces
    },
    text: {
      primary: '#333333', // cor de texto principal
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
    h1: {
      fontSize: '2.25rem', // ~36px
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.75rem', // ~28px
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // remover uppercase automático do MUI
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8, // bordas arredondadas globais
  },
  components: {
    // Exemplo de override para Button:
    MuiButton: {
      styleOverrides: {
        root: {
          // Deixa os botões mais "encorpados"
          padding: '0.6rem 1.2rem',
        },
      },
    },
  },
});

export default theme;
