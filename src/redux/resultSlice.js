
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentResult: null,
  history: [],
  leaderboard: [],
};

const resultSlice = createSlice({
  name: 'results',
  initialState,

  reducers: {
    calculateResult: (state, action) => {
      const {
        questions,
        answers,
        userId,
        userName,
        quizTitle,
        timeTaken,
        completedAt,
      } = action.payload;

      let correctCount = 0;

      questions.forEach((question) => {
        if (
          answers[question.id] === question.correctAnswer
        ) {
          correctCount += 1;
        }
      });

      const totalQuestions = questions.length;
      const wrongCount = totalQuestions - correctCount;

      const percentage =
        totalQuestions > 0
          ? Math.round((correctCount / totalQuestions) * 100)
          : 0;

      state.currentResult = {
        userId,
        userName,
        quizTitle,
        totalQuestions,
        correctCount,
        wrongCount,
        unansweredCount: questions.filter(
          (question) => answers[question.id] === undefined
        ).length,
        percentage,
        timeTaken,
        completedAt,
      };
    },

    addResult: (state, action) => {
      state.history.unshift(action.payload);
    },

    setHistory: (state, action) => {
      state.history = action.payload;
    },

    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },

    clearCurrentResult: (state) => {
      state.currentResult = null;
    },

    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  calculateResult,
  addResult,
  setHistory,
  setLeaderboard,
  clearCurrentResult,
  clearHistory,
} = resultSlice.actions;

export default resultSlice.reducer;
