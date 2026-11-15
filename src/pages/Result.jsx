
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material'

import {
  calculateResult,
  addResult,
} from '../redux/resultSlice'

import { addResultAPI } from '../services/apiServices'

function Result() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    questions,
    answers,
    selectedQuiz,
    quizStatus,
  } = useSelector((state) => state.quiz)

  const user = useSelector((state) => state.auth.user)
  const result = useSelector((state) => state.results.currentResult)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const savedRef = useRef(false)

  useEffect(() => {
    const saveResult = async () => {
      if (savedRef.current) return

      if (questions.length === 0 || !user) {
        setError('Quiz result is unavailable. Please take a quiz first.')
        setLoading(false)
        return
      }

      savedRef.current = true

      try {
        const completedAt = new Date().toISOString()

        const timeTaken = 600

        const payload = {
          questions,
          answers,
          userId: user.id,
          userName: user.name,
          quizTitle: selectedQuiz?.category || 'General Quiz',
          timeTaken,
          completedAt,
        }

        // Calculate score using Redux
        dispatch(calculateResult(payload))

        // Calculate score locally for API save
        let correctCount = 0

        questions.forEach((question) => {
          if (answers[question.id] === question.correctAnswer) {
            correctCount++
          }
        })

        const totalQuestions = questions.length
        const wrongCount = questions.filter(
          (question) => answers[question.id] !== undefined &&
          answers[question.id] !== question.correctAnswer
        ).length

        const unansweredCount = totalQuestions - correctCount - wrongCount

        const percentage = Math.round(
          (correctCount / totalQuestions) * 100
        )

        const savedResult = await addResultAPI({
          userId: user.id,
          userName: user.name,
          quizTitle: selectedQuiz?.category || 'General Quiz',
          totalQuestions,
          correctCount,
          wrongCount,
          unansweredCount,
          percentage,
          timeTaken,
          completedAt,
        })

        dispatch(addResult(savedResult))
      } catch (err) {
        setError('Result calculated, but saving to server failed.')
      } finally {
        setLoading(false)
      }
    }

    if (quizStatus === 'completed') {
      saveResult()
    } else {
      setError('Please complete a quiz before viewing results.')
      setLoading(false)
    }
  }, [
    dispatch,
    questions,
    answers,
    user,
    selectedQuiz,
    quizStatus,
  ])

  const handleDashboard = () => {
    navigate('/dashboard')
  }

  const handleRetry = () => {
    navigate('/quizzes')
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  const displayResult = result

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f5f6fa' }}>

      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 750, mx: 'auto', textAlign: 'center' }}
      >

        <Typography variant="h4" fontWeight="bold" mb={1}>
          Quiz Completed!
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Well done, {user?.name}!
        </Typography>

        {error && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {displayResult && (
          <>
            <Typography variant="h2" color="primary" fontWeight="bold">
              {displayResult.percentage}%
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Your Score
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                  <Typography variant="h4" color="success.main">
                    {displayResult.correctCount}
                  </Typography>
                  <Typography>Correct</Typography>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
                  <Typography variant="h4" color="error.main">
                    {displayResult.wrongCount}
                  </Typography>
                  <Typography>Wrong</Typography>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, bgcolor: '#fff8e1' }}>
                  <Typography variant="h4" color="warning.main">
                    {displayResult.unansweredCount}
                  </Typography>
                  <Typography>Skipped</Typography>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
                  <Typography variant="h4" color="primary.main">
                    {displayResult.totalQuestions}
                  </Typography>
                  <Typography>Total</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Typography mt={3}>
              Quiz: {displayResult.quizTitle}
            </Typography>
          </>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" onClick={handleRetry}>
            Try Another Quiz
          </Button>

          <Button variant="outlined" onClick={handleDashboard}>
            Dashboard
          </Button>
        </Box>

      </Paper>
    </Box>
  )
}

export default Result
