import { CssBaseline, ThemeProvider, createTheme, Typography, Box } from '@mui/material';
import { PostList } from './components/PostList';

// Create a custom Material UI theme with dark mode
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Header */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            pt: { xs: 3, sm: 4, md: 5 },
            pb: { xs: 2, sm: 3, md: 4 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          Posts
        </Typography>

        {/* Main Content */}
        <Box
          sx={{
            width: { xs: '100%', lg: '1200px' },
            flex: 1,
          }}
        >
          <PostList />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
