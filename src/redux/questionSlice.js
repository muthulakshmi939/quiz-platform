
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  loading: false,
  error: null,
  searchTerm: '',
  category: 'all',
  difficulty: 'all',
  currentPage: 1,
  itemsPerPage: 5,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,

  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.error = null;
    },

    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },

    updateQuestion: (state, action) => {
      const { id, updatedData } = action.payload;

      const index = state.questions.findIndex(
        (question) => String(question.id) === String(id)
      );

      if (index !== -1) {
        state.questions[index] = {
          ...state.questions[index],
          ...updatedData,
        };
      }
    },

    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) =>
          String(question.id) !== String(action.payload)
      );
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
      state.currentPage = 1;
    },

    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
      state.currentPage = 1;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },

    setQuestionLoading: (state, action) => {
      state.loading = action.payload;
    },

    setQuestionError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearQuestionError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setSearchTerm,
  setCategory,
  setDifficulty,
  setCurrentPage,
  setItemsPerPage,
  setQuestionLoading,
  setQuestionError,
  clearQuestionError,
} = questionSlice.actions;

export default questionSlice.reducer;
