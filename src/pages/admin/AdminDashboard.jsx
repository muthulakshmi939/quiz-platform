import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
} from '@mui/material'
import {
  Dashboard,
  AddCircle,
  Quiz,
  Logout,
} from '@mui/icons-material'

import { logout } from '../../redux/authSlice'

function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Admin Dashboard
          </Typography>

          <Typography color="text.secondary">
            Welcome, {user?.name || 'Admin'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Dashboard sx={{ fontSize: 45, color: '#1976d2' }} />

            <Typography variant="h6" sx={{ mt: 1 }}>
              Dashboard
            </Typography>

            <Typography color="text.secondary">
              Manage your quiz platform
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AddCircle sx={{ fontSize: 45, color: '#2e7d32' }} />

            <Typography variant="h6" sx={{ mt: 1 }}>
              Add Questions
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate('/admin/add-question')}
            >
              Add Question
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Quiz sx={{ fontSize: 45, color: '#ed6c02' }} />

            <Typography variant="h6" sx={{ mt: 1 }}>
              View Questions
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate('/admin/questions')}
            >
              View Questions
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard