import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

function DailyGoalTracker({ goal = 10 }) {
  const [count, setCount] = useState(0);
  const percent = Math.min((count / goal) * 100, 100);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h6">Daily Goal: {goal} jobs</Typography>
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '8px solid #1976d2',
          position: 'relative',
          background: `conic-gradient(#1976d2 ${percent}%, #e0e0e0 ${percent}%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ position: 'absolute' }}>{count}</Typography>
      </Box>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => setCount(count + 1)}>
        Add Job
      </Button>
    </Box>
  );
}

export default DailyGoalTracker;
