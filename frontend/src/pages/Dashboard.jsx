import { Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Dashboard() {
  const navigate = useNavigate();
  const { userId, email, name, logout } = useContext(UserContext);

  // Logout handler
  const handleLogout = () => {
    logout(); // clear user context
    navigate('/login');
  };

  console.log("User ID from context:", userId);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Dashboard</Typography>

      <Typography variant="subtitle1" align="center">
        Welcome {name}
      </Typography>

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
