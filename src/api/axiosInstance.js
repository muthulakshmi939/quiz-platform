
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://redux-quiz-6.onrender.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
