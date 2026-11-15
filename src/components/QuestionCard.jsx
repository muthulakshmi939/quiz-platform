
import {
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from '@mui/material'

function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerChange,
}) {
  if (!question) return null

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        width: '100%',
      }}
    >
      <Typography
        variant="subtitle1"
        color="primary"
        fontWeight="bold"
        mb={2}
      >
        Question {questionNumber}
      </Typography>

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        {question.question}
      </Typography>

      <RadioGroup
        value={selectedAnswer || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
      >
        {question.options?.map((option, index) => (
          <Box
            key={index}
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              mb: 1.5,
              px: 2,
              bgcolor:
                selectedAnswer === option
                  ? '#e3f2fd'
                  : '#fff',
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <FormControlLabel
              value={option}
              control={<Radio />}
              label={option}
              sx={{
                width: '100%',
                py: 0.5,
              }}
            />
          </Box>
        ))}
      </RadioGroup>
    </Paper>
  )
}

export default QuestionCard
