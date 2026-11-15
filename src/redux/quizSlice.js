
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedQuiz: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 0,
  quizStatus: 'idle',
  category: 'all',
  difficulty: 'all',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,

  reducers: {
    setSelectedQuiz: (state, action) => {
      state.selectedQuiz = action.payload;
    },

    setQuizQuestions: (state, action) => {
      state.questions = action.payload;
    },

    setFilters: (state, action) => {
      const { category, difficulty } = action.payload;

      if (category !== undefined) {
        state.category = category;
      }

      if (difficulty !== undefined) {
        state.difficulty = difficulty;
      }
    },

    startQuiz: (state, action) => {
      state.questions = action.payload.questions || [];
      state.selectedQuiz = action.payload.quiz || null;
      state.timeRemaining = action.payload.duration || 600;
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.quizStatus = 'inProgress';
    },

    answerQuestion: (state, action) => {
      const { questionId, selectedAnswer } = action.payload;

      state.answers[questionId] = selectedAnswer;
    },

    nextQuestion: (state) => {
      if (
        state.currentQuestionIndex <
        state.questions.length - 1
      ) {
        state.currentQuestionIndex += 1;
      }
    },

    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },

    goToQuestion: (state, action) => {
      const index = action.payload;

      if (index >= 0 && index < state.questions.length) {
        state.currentQuestionIndex = index;
      }
    },

    tickTimer: (state) => {
      if (
        state.quizStatus === 'inProgress' &&
        state.timeRemaining > 0
      ) {
        state.timeRemaining -= 1;
      }

      if (
        state.quizStatus === 'inProgress' &&
        state.timeRemaining === 0
      ) {
        state.quizStatus = 'completed';
      }
    },

    submitQuiz: (state) => {
      state.quizStatus = 'completed';
    },

    resetQuiz: (state) => {
      state.selectedQuiz = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.timeRemaining = 0;
      state.quizStatus = 'idle';
    },
  },
});

export const {
  setSelectedQuiz,
  setQuizQuestions,
  setFilters,
  startQuiz,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  tickTimer,
  submitQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
