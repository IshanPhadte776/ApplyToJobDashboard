import { Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Dashboard</Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={() => navigate('/userdata')}>User Data</Button>
        <Button variant="contained" onClick={() => navigate('/companies')}>Companies Accounts</Button>
        <Button variant="contained" onClick={() => navigate('/applications')}>Applications</Button>
        <Button variant="contained" onClick={() => navigate('/resumes')}>Resumes / Cover Letters</Button>
      </Stack>
      {/* DailyGoalTracker and StatsCards will go here */}
    </Container>
  );
}

export default Dashboard;
