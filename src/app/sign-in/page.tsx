'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateUserLogin } from '@/lib/redux/slices/userSlice';
import { client } from '../common/utils';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Dog Finder
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface UserForm {
  name: string;
  email: string;
}

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userForm, setUserForm] = useState<UserForm>({
    name: 'user',
    email: 'user@gmail.com',
  });
  const isEmailValid =
    userForm.email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userForm.email);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const resp = await client.post('/auth/login', {
        name: userForm.name,
        email: userForm.email,
      });
      if (resp.status === 200) {
        dispatch(updateUserLogin(true));
        router.push('/dog-board');
      } else {
        console.error('Login failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            id="name"
            data-testid="name"
            label="Name"
            type="text"
            value={userForm.name}
            onChange={handleChange}
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={userForm.email}
            onChange={handleChange}
            helperText={
              isEmailValid
                ? 'The user name and email are auto-populated for demo purposes only.'
                : 'Invalid email address.'
            }
            error={!isEmailValid}
            autoComplete="email"
            autoFocus
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            name="sign-in-btn"
            fullWidth
            variant="contained"
            color="secondary"
            data-testid="sign-in-btn"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isEmailValid}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
