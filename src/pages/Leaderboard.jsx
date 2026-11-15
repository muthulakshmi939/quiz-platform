
import { useEffect, useState } from 'react'
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

import { getResultsAPI } from '../services/apiServices'

function Leaderboard() {
  const navigate = useNavigate()

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getResultsAPI()

        // Sort students by percentage (highest first)
        const sortedResults = [...data].sort(
          (a, b) => b.percentage - a.percentage
        )

        setResults(sortedResults)
      } catch (err) {
        setError('Unable to load leaderboard.')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

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
            Leaderboard
          </Typography>

          <Typography color="text.secondary">
            See how students performed in quizzes.
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
              Total Attempts: {results.length}
            </Typography>
          </Paper>

          {results.length === 0 ? (
            <Alert severity="info">
              No quiz results available yet.
            </Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Rank</strong></TableCell>
                    <TableCell><strong>Student Name</strong></TableCell>
                    <TableCell><strong>Quiz</strong></TableCell>
                    <TableCell><strong>Correct</strong></TableCell>
                    <TableCell><strong>Score</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {results.map((item, index) => (
                    <TableRow key={item.id || index}>
                      <TableCell>
                        {index + 1}
                        {index === 0 && ' 🏆'}
                      </TableCell>

                      <TableCell>{item.userName}</TableCell>
                      <TableCell>{item.quizTitle}</TableCell>
                      <TableCell>{item.correctCount}</TableCell>

                      <TableCell>
                        <Chip
                          label={`${item.percentage}%`}
                          color={
                            item.percentage >= 50 ? 'success' : 'error'
                          }
                        />
                      </TableCell>

                      <TableCell>
                        {item.completedAt
                          ? new Date(item.completedAt).toLocaleDateString()
                          : '-'}
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

export default Leaderboard
