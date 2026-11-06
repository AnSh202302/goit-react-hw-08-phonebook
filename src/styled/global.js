import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#5EEAD4',
      contrastText: '#0B1120',
    },

    background: {
      default: '#0B1120',
      paper: '#142333',
    },

    text: {
      primary: '#E6EDF7',
      secondary: '#A9BACD',
    },

    divider: 'rgba(180, 210, 230, 0.18)',
    contactAvatar: {
      teal: '#216B70',
      blue: '#315F82',
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '4rem', fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0b1120',
          backgroundImage: `
  radial-gradient(
    ellipse at 75% 0%,
    rgba(20, 184, 166, 0.25) 0%,
    transparent 55%
  ),
  radial-gradient(
    ellipse at 40% 100%,
    rgba(20, 184, 166, 0.22) 0%,
    transparent 55%
  ),
  radial-gradient(
    ellipse at 0% 45%,
    rgba(56, 189, 248, 0.10) 0%,
    transparent 50%
  )
`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'glass' },
          style: {
            backgroundColor: 'rgba(20, 35, 51, 0.50)',
            backgroundImage: `
    linear-gradient(
      135deg,
      rgba(180, 220, 235, 0.08),
      rgba(180, 220, 235, 0.01) 60%
    )
  `,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(180, 210, 230, 0.30)',
            borderRadius: '24px',
            boxShadow: `
    inset 0 1px 0 rgba(220, 245, 255, 0.12),
    inset 0 -16px 32px rgba(3, 10, 20, 0.18),
    0 16px 48px rgba(0, 0, 0, 0.18)
  `,
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(180, 210, 230, 0.35)',
          },

          '&:hover:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline':
            {
              borderColor: 'rgba(94, 234, 212, 0.65)',
            },

          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5EEAD4',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,

          '&.Mui-focusVisible': {
            outline: '2px solid #E6EDF7',
            outlineOffset: '3px',
          },
          '&[aria-current="page"]': {
            color: '#E6EDF7',
            backgroundColor: 'rgba(94, 234, 212, 0.16)',
            boxShadow: 'inset 0 0 0 1px rgba(94, 234, 212, 0.30)',

            '&:hover': {
              backgroundColor: 'rgba(94, 234, 212, 0.22)',
            },
          },
        },

        sizeLarge: {
          minHeight: '48px',
          padding: '12px 20px',
          fontSize: '1rem',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: '48px',
          height: '48px',
          flexShrink: 0,
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#E6EDF7',
          backgroundImage: `
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.12),
          rgba(11, 17, 32, 0.12)
        )
      `,
          border: '1px solid rgba(180, 210, 230, 0.22)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        },

        colorDefault: {
          backgroundColor: '#216B70',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(20, 35, 51, 0.40)',
          backgroundImage: `
        linear-gradient(
          135deg,
          rgba(180, 220, 235, 0.06),
          transparent 70%
        )
      `,
          border: '1px solid rgba(180, 210, 230, 0.24)',
          borderRadius: '16px',
          boxShadow: `
        inset 0 1px 0 rgba(220, 245, 255, 0.08),
        inset 0 -8px 20px rgba(3, 10, 20, 0.12)
      `,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          color: '#E6EDF7',
          backgroundColor: 'rgba(180, 210, 230, 0.06)',
          border: '1px solid rgba(180, 210, 230, 0.24)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',

          '&:hover': {
            backgroundColor: 'rgba(94, 234, 212, 0.12)',
            borderColor: 'rgba(94, 234, 212, 0.50)',
          },

          '&.Mui-focusVisible': {
            outline: '2px solid #E6EDF7',
            outlineOffset: '3px',
          },

          '&.Mui-disabled': {
            borderColor: 'rgba(180, 210, 230, 0.10)',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

export default theme;
