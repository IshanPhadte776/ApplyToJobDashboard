import { Container, Typography, TextField, Button } from '@mui/material';

function JobForm() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Job Form</Typography>
      <form>
        <TextField label="Job Title" fullWidth margin="normal" />
        <TextField label="Company" fullWidth margin="normal" />
        <TextField label="Location" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>Save Job</Button>
      </form>
    </Container>
  );
}

export default JobForm;
