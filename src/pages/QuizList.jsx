
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Avatar,
} from '@mui/material'

import QuizIcon from '@mui/icons-material/Quiz'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'

import {
  setQuestions,
  setCategory,
  setDifficulty,
  setQuestionLoading,
  setQuestionError,
} from '../redux/questionSlice'

import { getQuestionsAPI } from '../services/apiServices'

function QuizList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    questions,
    loading,
    error,
    category,
    difficulty,
  } = useSelector((state) => state.questions)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        dispatch(setQuestionLoading(true))
        const data = await getQuestionsAPI()
        dispatch(setQuestions(data))
      } catch (err) {
        dispatch(setQuestionError('Failed to load questions'))
      } finally {
        dispatch(setQuestionLoading(false))
      }
    }

    fetchQuestions()
  }, [dispatch])

  const categories = [
    ...new Set(questions.map((question) => question.category)),
  ].filter(Boolean)

  const filteredQuestions = questions.filter((question) => {
    const categoryMatch =
      category === 'all' || question.category === category

    const difficultyMatch =
      difficulty === 'all' || question.difficulty === difficulty

    return categoryMatch && difficultyMatch
  })

  const quizzes = categories
    .map((item) => {
      const categoryQuestions = filteredQuestions.filter(
        (question) => question.category === item
      )

      return {
        category: item,
        questions: categoryQuestions,
      }
    })
    .filter((quiz) => quiz.questions.length > 0)

  const handleStartQuiz = (quiz) => {
    navigate('/quiz', {
      state: {
        category: quiz.category,
        difficulty,
      },
    })
  }

  const colors = [
    { main: '#6366f1', light: '#eef0ff' },
    { main: '#0891b2', light: '#e0f7fa' },
    { main: '#059669', light: '#e0f7ec' },
    { main: '#d97706', light: '#fff4df' },
  ]

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, pb: 4 }}>

      {/* Heading */}
      <Box
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(120deg, #3730a3, #6366f1)',
          color: 'white',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              width: 55,
              height: 55,
            }}
          >
            <QuizIcon fontSize="large" />
          </Avatar>

          <Box>
            <Typography variant="h4" fontWeight="bold">
              Available Quizzes
            </Typography>

            <Typography sx={{ opacity: 0.9 }}>
              Choose a category and test your knowledge!
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Filters */}
      <Card
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          border: '1px solid #e8eaf0',
          borderRadius: 3,
        }}
      >
        <Typography fontWeight="bold" mb={2}>
          Filter Quizzes
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
        >
          <TextField
            select
            fullWidth
            size="small"
            label="Category"
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <MenuItem value="all">All Categories</MenuItem>

            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            size="small"
            label="Difficulty"
            value={difficulty}
            onChange={(e) => dispatch(setDifficulty(e.target.value))}
          >
            <MenuItem value="all">All Levels</MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>
        </Stack>
      </Card>

      {/* Quiz count */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Explore Categories
        </Typography>

        <Chip
          label={`${filteredQuestions.length} Questions`}
          color="primary"
          variant="outlined"
        />
      </Stack>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Alert severity="error">{error}</Alert>
      )}

      {/* Quiz Cards */}
      {!loading && !error && (
        <>
          {quizzes.length === 0 ? (
            <Card
              elevation={0}
              sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}
            >
              <AutoStoriesIcon
                sx={{ fontSize: 45, color: '#9ca3af', mb: 1 }}
              />

              <Typography fontWeight="bold">
                No quizzes available
              </Typography>

              <Typography color="text.secondary">
                Try selecting different filters.
              </Typography>
            </Card>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {quizzes.map((quiz, index) => {
                const color = colors[index % colors.length]

                return (
                  <Card
                    key={quiz.category}
                    elevation={0}
                    sx={{
                      border: '1px solid #e8eaf0',
                      borderRadius: 3,
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: color.light,
                          color: color.main,
                          width: 50,
                          height: 50,
                          mb: 2,
                        }}
                      >
                        <AutoStoriesIcon />
                      </Avatar>

                      <Typography variant="h6" fontWeight="bold" mb={1}>
                        {quiz.category}
                      </Typography>

                      <Chip
                        label={`${quiz.questions.length} Questions`}
                        size="small"
                        sx={{
                          bgcolor: color.light,
                          color: color.main,
                          fontWeight: 'bold',
                          mb: 2,
                        }}
                      />

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={3}
                      >
                        Difficulty: {
                          difficulty === 'all' ? 'All Levels' : difficulty
                        }
                      </Typography>

                      <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => handleStartQuiz(quiz)}
                        sx={{
                          bgcolor: color.main,
                          borderRadius: 2,
                          py: 1,
                          textTransform: 'none',
                          fontWeight: 'bold',
                          '&:hover': {
                            bgcolor: color.main,
                            filter: 'brightness(0.9)',
                          },
                        }}
                      >
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </Box>
          )}
        </>
      )}

    </Box>
  )
}

export default QuizList
