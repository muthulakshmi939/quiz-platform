
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material'

import {
  startQuiz,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  tickTimer,
  submitQuiz,
} from '../redux/quizSlice'

import { getQuestionsAPI } from '../services/apiServices'
import QuestionCard from '../components/QuestionCard'

function QuizPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { category = 'all', difficulty = 'all' } = location.state || {}

  const {
    questions,
    currentQuestionIndex,
    answers,
    timeRemaining,
    quizStatus,
  } = useSelector((state) => state.quiz)

  const user = useSelector((state) => state.auth.user)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch and start quiz
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getQuestionsAPI()

        const filteredQuestions = data.filter((question) => {
          const categoryMatch =
            category === 'all' || question.category === category

          const difficultyMatch =
            difficulty === 'all' || question.difficulty === difficulty

          return categoryMatch && difficultyMatch
        })

        if (filteredQuestions.length === 0) {
          setError('No questions available for this quiz.')
          return
        }

        dispatch(
          startQuiz({
            questions: filteredQuestions,
            quiz: { category, difficulty },
            duration: 600,
          })
        )
      } catch (err) {
        setError('Unable to load questions. Check JSON Server.')
      } finally {
        setLoading(false)
      }
    }

    loadQuiz()
  }, [category, difficulty, dispatch])

  // Countdown timer
  useEffect(() => {
    if (loading || quizStatus !== 'inProgress') return

    const timer = setInterval(() => {
      dispatch(tickTimer())
    }, 1000)

    return () => clearInterval(timer)
  }, [loading, quizStatus, dispatch])

  // Navigate to result
  useEffect(() => {
    if (quizStatus === 'completed') {
      navigate('/result')
    }
  }, [quizStatus, navigate])

  const currentQuestion = questions[currentQuestionIndex]

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }

  const handleAnswer = (answer) => {
    dispatch(
      answerQuestion({
        questionId: currentQuestion.id,
        selectedAnswer: answer,
      })
    )
  }

  const handleSubmit = () => {
    dispatch(submitQuiz())
  }

  if (loading) {
    return <Typography sx={{ p: 4 }}>Loading questions...</Typography>
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error" mb={2}>
          {error}
        </Typography>

        <Button onClick={() => navigate('/quizzes')}>
          Back to Quizzes
        </Button>
      </Box>
    )
  }

  if (!currentQuestion) return null

  const progress =
    ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#f5f6fa' }}>

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {category === 'all' ? 'General Quiz' : category}
          </Typography>

          <Typography color="text.secondary">
            Student: {user?.name || 'Student'}
          </Typography>
        </Box>

        <Chip
          label={`Time: ${formatTime(timeRemaining)}`}
          color={timeRemaining < 60 ? 'error' : 'primary'}
          sx={{ fontSize: 16, p: 2 }}
        />
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mb: 3, height: 8, borderRadius: 5 }}
      />

      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 850, mx: 'auto' }}
      >

        {/* Reusable QuestionCard */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswerChange={handleAnswer}
        />

        {/* Question Navigation */}
        <Box sx={{ mt: 4 }}>
          <Typography fontWeight="bold" mb={2}>
            Questions
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {questions.map((question, index) => (
              <Button
                key={question.id}
                variant={
                  currentQuestionIndex === index
                    ? 'contained'
                    : answers[question.id] !== undefined
                    ? 'outlined'
                    : 'text'
                }
                color={
                  answers[question.id] !== undefined
                    ? 'success'
                    : 'primary'
                }
                onClick={() => dispatch(goToQuestion(index))}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Previous / Next / Submit */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            disabled={currentQuestionIndex === 0}
            onClick={() => dispatch(previousQuestion())}
          >
            Previous
          </Button>

          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={() => dispatch(nextQuestion())}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Submit Quiz
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default QuizPage
