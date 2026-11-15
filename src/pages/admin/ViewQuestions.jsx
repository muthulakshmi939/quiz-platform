
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import {
  getQuestionsAPI,
  deleteQuestionAPI,
} from '../../services/apiServices'

function ViewQuestions() {
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const data = await getQuestionsAPI()
      setQuestions(data)
      setError('')
    } catch (err) {
      setError('Unable to load questions. Check JSON Server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this question?'
    )

    if (!confirmDelete) return

    try {
      await deleteQuestionAPI(id)

      setQuestions((prev) =>
        prev.filter((question) => question.id !== id)
      )
    } catch (err) {
      setError('Failed to delete question.')
    }
  }

  const filteredQuestions = questions.filter((item) =>
    `${item.question} ${item.category} ${item.difficulty}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa', p: 3 }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin')}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                All Questions
              </Typography>

              <Typography color="text.secondary">
                Total Questions: {questions.length}
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => navigate('/admin/add-question')}
            >
              Add Question
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Search by question or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 3 }}
          />

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {loading ? (
            <Typography>Loading questions...</Typography>
          ) : filteredQuestions.length === 0 ? (
            <Typography color="text.secondary">
              No questions found.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#eeeeee' }}>
                    <TableCell><b>No.</b></TableCell>
                    <TableCell><b>Question</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Difficulty</b></TableCell>
                    <TableCell align="center"><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredQuestions.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell sx={{ minWidth: 250 }}>
                        {item.question}
                      </TableCell>

                      <TableCell>{item.category}</TableCell>

                      <TableCell>
                        <Chip
                          label={item.difficulty}
                          color={
                            item.difficulty === 'Easy'
                              ? 'success'
                              : item.difficulty === 'Medium'
                              ? 'warning'
                              : 'error'
                          }
                          size="small"
                        />
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(`/admin/edit-question/${item.id}`)
                          }
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

export default ViewQuestions
