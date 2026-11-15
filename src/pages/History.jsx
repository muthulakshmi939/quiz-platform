
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material'

import { getUserResultsAPI } from '../services/apiServices'

function History() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) {
        setError('Please login to view your history.')
        setLoading(false)
        return
      }

      try {
        const data = await getUserResultsAPI(user.id)
        setHistory(data)
      } catch (err) {
        setError('Unable to load quiz history.')
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [user])

  const formatDate = (date) => {
    if (!date) return '-'

    return new Date(date).toLocaleString()
  }

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f5f6fa' }}>

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
          <Typography variant="h4" fontWeight="bold">
            My Quiz History
          </Typography>

          <Typography color="text.secondary">
            View your previous quiz attempts.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">
              Total Attempts: {history.length}
            </Typography>
          </Paper>

          {history.length === 0 ? (
            <Alert severity="info">
              You haven't attempted any quizzes yet.
            </Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>No.</strong></TableCell>
                    <TableCell><strong>Quiz</strong></TableCell>
                    <TableCell><strong>Correct</strong></TableCell>
                    <TableCell><strong>Wrong</strong></TableCell>
                    <TableCell><strong>Skipped</strong></TableCell>
                    <TableCell><strong>Score</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {history.map((item, index) => (
                    <TableRow key={item.id || index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.quizTitle}</TableCell>
                      <TableCell>{item.correctCount}</TableCell>
                      <TableCell>{item.wrongCount}</TableCell>
                      <TableCell>{item.unansweredCount}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${item.percentage}%`}
                          color={
                            item.percentage >= 50 ? 'success' : 'error'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {formatDate(item.completedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

    </Box>
  )
}

export default History
