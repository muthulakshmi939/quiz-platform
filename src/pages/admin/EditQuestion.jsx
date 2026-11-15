
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from '@mui/material'

import {
  getQuestionAPI,
  updateQuestionAPI,
} from '../../services/apiServices'

function EditQuestion() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Fetch existing question
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestionAPI(id)

        setQuestion(data.question || '')
        setOptions(data.options || ['', '', '', ''])
        setCorrectAnswer(data.correctAnswer || '')
        setCategory(data.category || '')
        setDifficulty(data.difficulty || 'Easy')
      } catch (err) {
        setError('Failed to load question.')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [id])

  // Update options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options]
    updatedOptions[index] = value
    setOptions(updatedOptions)
  }

  // Update question
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (
      !question.trim() ||
      !category.trim() ||
      options.some((option) => !option.trim()) ||
      !correctAnswer
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (!options.includes(correctAnswer)) {
      setError('Please select a valid correct answer.')
      return
    }

    const updatedData = {
      question,
      options,
      correctAnswer,
      category,
      difficulty,
    }

    try {
      setSaving(true)

      await updateQuestionAPI(id, updatedData)

      alert('Question updated successfully!')

      navigate('/admin/questions')
    } catch (err) {
      setError('Failed to update question.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Typography sx={{ p: 3 }}>Loading question...</Typography>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa', p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 650,
          mx: 'auto',
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Edit Question
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Question"
            multiline
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            margin="normal"
          />

          <Typography variant="h6" mt={3}>
            Answer Options
          </Typography>

          {options.map((option, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(index, e.target.value)
              }
              margin="normal"
            />
          ))}

          <TextField
            select
            fullWidth
            label="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            margin="normal"
          >
            {options.filter((option) => option.trim()).map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={saving}
            sx={{ mt: 3, py: 1.5 }}
          >
            {saving ? 'Updating...' : 'Update Question'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate('/admin/questions')}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default EditQuestion
