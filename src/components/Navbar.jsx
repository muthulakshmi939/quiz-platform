
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material'

import { logout } from '../redux/authSlice'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          Quiz Platform
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography>
            Welcome, {user?.name || 'Student'}
          </Typography>

          <Button
            color="inherit"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate('/quizzes')}
          >
            Quizzes
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate('/history')}
          >
            History
          </Button>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
