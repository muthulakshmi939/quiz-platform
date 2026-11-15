
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
} from '@mui/material'

import SchoolIcon from '@mui/icons-material/School'
import QuizIcon from '@mui/icons-material/Quiz'
import HistoryIcon from '@mui/icons-material/History'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'

function Dashboard() {
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)
  const history = useSelector((state) => state.results.history || [])

  const averageScore =
    history.length > 0
      ? Math.round(
          history.reduce(
            (total, item) => total + Number(item.percentage || 0),
            0
          ) / history.length
        )
      : 0

  const dashboardItems = [
    {
      title: 'Available Quizzes',
      description: 'Explore different topics and test your knowledge.',
      button: 'Start Quiz',
      path: '/quizzes',
      icon: <QuizIcon />,
      color: '#6366f1',
      bg: '#eef0ff',
    },
    {
      title: 'My History',
      description: 'Track your previous quiz attempts and performance.',
      button: 'View History',
      path: '/history',
      icon: <HistoryIcon />,
      color: '#0891b2',
      bg: '#e0f7fa',
    },
    {
      title: 'Leaderboard',
      description: 'Discover top performers and check your scores.',
      button: 'View Leaderboard',
      path: '/leaderboard',
      icon: <EmojiEventsIcon />,
      color: '#d97706',
      bg: '#fff4df',
    },
  ]

  const stats = [
    {
      title: 'Total Attempts',
      value: history.length,
      icon: <QuizIcon />,
      color: '#6366f1',
      bg: '#eef0ff',
    },
    {
      title: 'Average Score',
      value: `${averageScore}%`,
      icon: <TrendingUpIcon />,
      color: '#059669',
      bg: '#e0f7ec',
    },
    {
      title: 'Account Type',
      value: user?.role || 'Student',
      icon: <SchoolIcon />,
      color: '#d97706',
      bg: '#fff4df',
    },
  ]

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, pb: 4 }}>

      {/* Welcome Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: 4,
          borderRadius: 4,
          color: 'white',
          background: 'linear-gradient(120deg, #3730a3, #6366f1, #818cf8)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip
            label="STUDENT PORTAL"
            sx={{
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.18)',
              fontWeight: 'bold',
              mb: 2,
            }}
          />

          <Typography variant="h4" fontWeight="bold" mb={1}>
            Hello, {user?.name || 'Student'}! 👋
          </Typography>

          <Typography sx={{ opacity: 0.9, mb: 3 }}>
            Welcome back! Ready to learn something new today?
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate('/quizzes')}
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: 'white',
              color: '#4338ca',
              fontWeight: 'bold',
              px: 3,
              '&:hover': { bgcolor: '#eef0ff' },
            }}
          >
            Explore Quizzes
          </Button>
        </Box>

        <AutoStoriesIcon
          sx={{
            position: 'absolute',
            right: { xs: -15, sm: 35 },
            bottom: -30,
            fontSize: { xs: 130, sm: 190 },
            opacity: 0.13,
          }}
        />
      </Paper>

      {/* Statistics */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Your Overview
      </Typography>

      <Grid container spacing={2} mb={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.title}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #e8eaf0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 55,
                  height: 55,
                  bgcolor: stat.bg,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Avatar>

              <Box>
                <Typography color="text.secondary" variant="body2">
                  {stat.title}
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Access */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Quick Access
        </Typography>

        
      </Stack>

      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid #e8eaf0',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.09)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Avatar
                  sx={{
                    width: 55,
                    height: 55,
                    bgcolor: item.bg,
                    color: item.color,
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Avatar>

                <Typography variant="h6" fontWeight="bold" mb={1}>
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minHeight: 45, mb: 3 }}
                >
                  {item.description}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(item.path)}
                  sx={{
                    bgcolor: item.color,
                    borderRadius: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: item.color,
                      filter: 'brightness(0.9)',
                    },
                  }}
                >
                  {item.button}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Motivational Section */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          bgcolor: '#eef2ff',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar sx={{ bgcolor: '#6366f1' }}>
          <SchoolIcon />
        </Avatar>

        <Box>
          <Typography fontWeight="bold">
            Keep Learning, Keep Growing!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Every quiz is another step towards success.
          </Typography>
        </Box>
      </Paper>

    </Box>
  )
}

export default Dashboard
