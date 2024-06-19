import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import logo from '../assets/career-path.png'; // Import the image

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formValues);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent', // Adjust this based on your logo background
          }}
        >
          {/* Logo Image */}
          <img src={logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
        </Box>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formValues.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formValues.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Don't have an account?{' '}
            <Link href="/signup" variant="body2">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
