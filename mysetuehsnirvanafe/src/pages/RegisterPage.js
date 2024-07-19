import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Modal, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { registerUser } from '../services/api';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

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

const RegisterPage = () => {
  const [open, setOpen] = useState(true);

  const handleRegister = async (values) => {
    try {
      await registerUser(values.username, values.password);
      alert('User registered successfully');
      setOpen(false); // Close the modal after successful registration
    } catch (error) {
      console.error(error);
      alert('Failed to register user');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="register-modal-title"
      aria-describedby="register-modal-description"
    >
      <Paper sx={modalStyle}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="register-modal-title" variant="h4" component="h2" gutterBottom>
            Register
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={2}
                >
                  <Field
                    name="username"
                    as={TextField}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={errors.username && touched.username}
                    helperText={errors.username && touched.username ? errors.username : null}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={errors.password && touched.password}
                    helperText={errors.password && touched.password ? errors.password : null}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Modal>
  );
};

export default RegisterPage;

