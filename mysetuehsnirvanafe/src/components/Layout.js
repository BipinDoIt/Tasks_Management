import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Link } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>Home</Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>About</Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>Contact</Link>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
        <Container maxWidth="sm">
          {/* <Typography variant="body1">Your footer content here.</Typography> */}
          <Typography variant="body2" color="text.secondary">
            {'© '}
            <Link color="inherit" href="#">
              My App
            </Link>{' '}
            {new Date().getFullYear()}.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Layout;

