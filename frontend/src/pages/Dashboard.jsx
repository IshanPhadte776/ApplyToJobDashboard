import { Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Optional: clear any auth tokens or user data here
    // localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Dashboard</Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => navigate('/userdata')}>User Data</Button>
        <Button variant="contained" onClick={() => navigate('/companies')}>Companies Accounts</Button>
        <Button variant="contained" onClick={() => navigate('/applications')}>Applications</Button>
        <Button variant="contained" onClick={() => navigate('/resumes')}>Resumes / Cover Letters</Button>
      </Stack>

      {/* Logout Button */}
      <Stack direction="row" justifyContent="center">
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>

      {/* DailyGoalTracker and StatsCards can go here */}
    </Container>
  );
}

export default Dashboard;
