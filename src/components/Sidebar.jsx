
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import QuizIcon from '@mui/icons-material/Quiz'
import HistoryIcon from '@mui/icons-material/History'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import LogoutIcon from '@mui/icons-material/Logout'

import { logout } from '../redux/authSlice'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Quizzes',
      path: '/quizzes',
      icon: <QuizIcon />,
    },
    {
      title: 'History',
      path: '/history',
      icon: <HistoryIcon />,
    },
    {
      title: 'Leaderboard',
      path: '/leaderboard',
      icon: <LeaderboardIcon />,
    },
  ]

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box
      sx={{
        width: 250,
        minHeight: '100vh',
        bgcolor: '#172554',
        color: 'white',
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ py: 3 }}
      >
        Quiz Platform
      </Typography>

      <Divider sx={{ bgcolor: 'white', mb: 2 }} />

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: 'white',
              '&.Mui-selected': {
                bgcolor: '#2563eb',
              },
              '&.Mui-selected:hover': {
                bgcolor: '#1d4ed8',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ bgcolor: 'white', my: 2 }} />

      <ListItemButton
        onClick={handleLogout}
        sx={{ color: 'white', borderRadius: 2 }}
      >
        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
          <LogoutIcon />
        </ListItemIcon>

        <ListItemText primary="Logout" />
      </ListItemButton>
    </Box>
  )
}

export default Sidebar
