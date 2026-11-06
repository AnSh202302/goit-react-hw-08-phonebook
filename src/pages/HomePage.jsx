import { Button, Container, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'store/auth/auth-selector';

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Paper
        variant="glass"
        sx={{
          p: { xs: 3, sm: 5, md: 7 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.25rem', md: '3.5rem' },
            lineHeight: 1.15,
            mb: 3,
          }}
        >
          Your people.
          <br />
          Always within reach.
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ maxWidth: '440px', mx: 'auto', mb: 4 }}
        >
          Keep your contacts in one place. Find, add and update phone numbers
          with ease.
        </Typography>

        <Button
          component={RouterLink}
          to={isLoggedIn ? '/contacts' : '/register'}
          variant="contained"
          size="large"
        >
          {isLoggedIn ? 'Open contacts' : 'Get started'}
        </Button>
      </Paper>
    </Container>
  );
}
