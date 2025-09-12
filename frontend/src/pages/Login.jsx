
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const verify = () => true;

  const handleLogin = (e) => {
    e.preventDefault();
    if (verify()) {
      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
    </Container>
  );
}

export default Login;
