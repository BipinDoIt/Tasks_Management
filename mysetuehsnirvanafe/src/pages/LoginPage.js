import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { Box, Button, TextField, Typography, Modal, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true); // Open the modal by default
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(username, password);
      const token = response.data.access_token;
      setToken(token);
      localStorage.setItem('token', token);
      setOpen(false); // Close the modal after successful login
      navigate('/');
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Paper sx={modalStyle}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="login-modal-title" variant="h4" component="h2" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default LoginPage;
