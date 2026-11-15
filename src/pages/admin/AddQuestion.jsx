
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from '@mui/material'

import { addQuestionAPI } from '../../services/apiServices'

function AddQuestion() {
  const navigate = useNavigate()

  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options]
    updatedOptions[index] = value
    setOptions(updatedOptions)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

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
      setError('Select a valid correct answer.')
      return
    }

    const questionData = {
      question,
      options,
      correctAnswer,
      category,
      difficulty,
    }

    try {
      setLoading(true)

      await addQuestionAPI(questionData)

      setSuccess('Question added successfully!')

      setQuestion('')
      setOptions(['', '', '', ''])
      setCorrectAnswer('')
      setCategory('')
      setDifficulty('Easy')
    } catch (err) {
      setError('Failed to add question. Check whether JSON Server is running.')
    } finally {
      setLoading(false)
    }
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
          Add New Question
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter Question"
            multiline
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            margin="normal"
          />

          <Typography variant="h6" mt={3} mb={1}>
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
            placeholder="Example: JavaScript"
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
            disabled={loading}
            sx={{ mt: 3, py: 1.5 }}
          >
            {loading ? 'Adding...' : 'Add Question'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate('/admin')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default AddQuestion
