
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../redux/authSlice';
import quizReducer from '../redux/quizSlice';
import questionReducer from '../redux/questionSlice';
import resultReducer from '../redux/resultSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    questions: questionReducer,
    results: resultReducer,
  },
});

export default store;
