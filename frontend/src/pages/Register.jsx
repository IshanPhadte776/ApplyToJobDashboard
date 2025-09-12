import { Button, TextField, Container, Typography } from '@mui/material';

function Register() {
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Register</Typography>
      <form>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <TextField label="Confirm Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>Register</Button>
      </form>
    </Container>
  );
}

export default Register;
