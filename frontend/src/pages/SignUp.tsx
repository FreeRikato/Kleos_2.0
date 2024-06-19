import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Paper, Link, MenuItem } from '@mui/material';
import backgroundImage from '../assets/signup.jpg';

const SignUp: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    career: '',
    currentYear: '',
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
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h4">
              Join Our Growing Community
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Sign up today and start your journey towards a fulfilling career.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formValues.name}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                select
                id="career"
                label="Career"
                name="career"
                value={formValues.career}
                onChange={handleChange}
              >
                <MenuItem value="Data Scientist">Data Scientist</MenuItem>
                <MenuItem value="AI/ML Engineer">AI/ML Engineer</MenuItem>
                <MenuItem value="Full Stack Web Development">Full Stack Web Development</MenuItem>
                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
              </TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="currentYear"
                label="Current Year of Study"
                name="currentYear"
                value={formValues.currentYear}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 1,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link href="/signin" variant="body2">
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUp;
