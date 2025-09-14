import { Container, Typography } from '@mui/material';
import DailyGoalTracker from '../components/DailyGoalTracker';

function Applications() {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Applications</Typography>
  <DailyGoalTracker goal={10} />
  {/* ApplicationsList, ApplicationForm, FilterSortBar will go here */}
    </Container>
  );
}

export default Applications;
