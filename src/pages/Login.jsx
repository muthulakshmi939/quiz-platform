
import { useState } from 'react'
import { useDispatch } from 'react-redux'
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

import { loginSuccess } from '../redux/authSlice'
import { loginAPI } from '../services/apiServices'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password')
      return
    }

    try {
      setLoading(true)

      // Check user in JSON Server
      const user = await loginAPI(email.trim(), password)

      if (!user) {
        setError('Invalid email or password')
        return
      }

      // Store logged-in user in Redux
      dispatch(loginSuccess(user))

      // Navigate according to role
      if (user.role === 'admin') {
        navigate('/admin', { replace: true })
      } else if (user.role === 'student') {
        navigate('/dashboard', { replace: true })
      } else {
        setError('Invalid user role')
      }

    } catch (err) {
      console.error('Login Error:', err)
      setError('Unable to connect to server. Please try again.')
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
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
          color="primary"
        >
          Quiz Platform
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Login to your account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin}>
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
              'Login'
            )}
          </Button>
        </Box>

        <Typography textAlign="center" mt={3}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default Login
