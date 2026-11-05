import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b1120',
      // paper: 'rgba(15, 23, 42, 0.6)',
    },
    // primary: {
    //   main: '#06b6d4',
    // },
    // secondary: {
    //   main: '#a855f7',
    // },
    text: {
      primary: '#C5D0DF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '4rem', fontWeight: 700 },
    // h4: { fontWeight: 600 },
    // body1: { fontWeight: 400 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0b1120',
          backgroundImage: `
              radial-gradient(at 10% 20%, hsla(240, 100%, 70%, 0.2) 0px, transparent 50%),
              radial-gradient(at 90% 80%, hsla(180, 100%, 70%, 0.15) 0px, transparent 50%)
            `,
          backgroundSize: 'cover',
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
        },
      },
    },

    //   // 1. ГЛОБАЛЬНІ СТИЛІ ДЛЯ КАРТОК (MuiCard)
    //   MuiCard: {
    //     styleOverrides: {
    //       root: {
    //         backgroundColor: 'rgba(15, 23, 42, 0.6)', // Напівпрозорий темний фон
    //         backdropFilter: 'blur(12px)', // Ефект матового скла
    //         WebkitBackdropFilter: 'blur(12px)',
    //         borderRadius: '16px',
    //         border: '1px solid rgba(255, 255, 255, 0.08)', // Тонка біла рамка для об'єму
    //         boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    //       },
    //     },
    //   },

    //   // 2. ГЛОБАЛЬНІ СТИЛІ ДЛЯ ПОЛІВ ВВОДУ (MuiTextField / MuiOutlinedInput)
    //   // У MUI елемент TextField складається з кількох частин. Нам потрібно стилізувати саме MuiOutlinedInput.
    //   MuiOutlinedInput: {
    //     styleOverrides: {
    //       root: {
    //         backgroundColor: 'rgba(15, 23, 42, 0.4)', // Темний напівпрозорий фон для інпута
    //         borderRadius: '12px',
    //         backdropFilter: 'blur(8px)',
    //         WebkitBackdropFilter: 'blur(8px)',
    //         transition: 'all 0.2s ease-in-out',

    //         // Стиль для рамки в звичайному стані (неактивному)
    //         '& .MuiOutlinedInput-notchedOutline': {
    //           borderColor: 'rgba(255, 255, 255, 0.1)',
    //         },
    //         // Стиль рамки при наведенні мишкою (hover)
    //         '&:hover .MuiOutlinedInput-notchedOutline': {
    //           borderColor: 'rgba(6, 182, 212, 0.5)', // Стає трішки бірюзовою
    //         },
    //         // Стиль, коли інпут активний (focussed) — додаємо неонове сяйво
    //         '&.Mui-focused': {
    //           backgroundColor: 'rgba(15, 23, 42, 0.7)', // Робимо трохи темнішим при фокусі
    //           '& .MuiOutlinedInput-notchedOutline': {
    //             borderColor: '#06b6d4', // Яскравий неоновий бірюзовий колір контуру
    //             borderWidth: '2px',
    //           },
    //           // Ефект неонової тіні навколо інпута
    //           boxShadow:
    //             '0 0 15px rgba(6, 182, 212, 0.3), inset 0 0 8px rgba(6, 182, 212, 0.1)',
    //         },
    //       },
    //       // Зміна кольору тексту всередині інпута
    //       input: {
    //         color: '#ffffff',
    //         '&::placeholder': {
    //           color: 'rgba(255, 255, 255, 0.5)', // Напівпрозорий плейсхолдер
    //           opacity: 1,
    //         },
    //       },
    //     },
    //   },

    //   // 3. СТИЛІ ДЛЯ ТЕКСТУ-ПІДКАЗКИ (MuiInputLabel) над інпутом
    //   MuiInputLabel: {
    //     styleOverrides: {
    //       root: {
    //         color: 'rgba(255, 255, 255, 0.6)', // Колір тексту підказки
    //         '&.Mui-focused': {
    //           color: '#06b6d4', // Колір підказки стає бірюзовим при фокусі
    //         },
    //       },
    //     },
    //   },
  },
});

export default theme;
