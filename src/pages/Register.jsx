
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material'

import {
  getUsersAPI,
  registerAPI,
} from '../services/apiServices'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      // Check whether email already exists
      const users = await getUsersAPI()

      const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      )

      if (existingUser) {
        setError('Email already registered. Please login.')
        return
      }

      // Register new student
      const userData = {
        name: name.trim(),
        email: email.trim(),
        password: password,
        role: 'student',
      }

      await registerAPI(userData)

      // Registration successful - go to Login page
      navigate('/login', {
        replace: true,
        state: {
          registered: true,
          email: email.trim(),
        },
      })

    } catch (err) {
      console.error('Registration Error:', err)
      setError('Registration failed. Please check JSON Server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f4f6fb',
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: '100%',
          maxWidth: 430,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          mb={1}
        >
          Create Account
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Register to start your quiz
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, py: 1.5 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </Button>
        </Box>

        <Typography textAlign="center" mt={3}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default Register
