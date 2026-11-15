
import axiosService from '../api/axiosService'

// ================= USERS / AUTH =================

// Get all users
export const getUsersAPI = () => {
  return axiosService('GET', '/users')
}

// Register user
export const registerAPI = (userData) => {
  return axiosService('POST', '/users', userData)
}

// Login user (development-only JSON Server authentication)
export const loginAPI = async (email, password) => {
  const users = await axiosService(
    'GET',
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  )

  return users[0] || null
}

// ================= QUESTIONS =================

// Get all questions
export const getQuestionsAPI = () => {
  return axiosService('GET', '/questions')
}

// Get one question
export const getQuestionAPI = (id) => {
  return axiosService('GET', `/questions/${id}`)
}

// Add question
export const addQuestionAPI = (questionData) => {
  return axiosService('POST', '/questions', questionData)
}

// Update question
export const updateQuestionAPI = (id, questionData) => {
  return axiosService('PUT', `/questions/${id}`, questionData)
}

// Delete question
export const deleteQuestionAPI = (id) => {
  return axiosService('DELETE', `/questions/${id}`)
}

// ================= RESULTS =================

// Get all results
export const getResultsAPI = () => {
  return axiosService('GET', '/results')
}

// Get results of a particular user
export const getUserResultsAPI = (userId) => {
  return axiosService('GET', `/results?userId=${encodeURIComponent(userId)}`)
}

// Save quiz result
export const addResultAPI = (resultData) => {
  return axiosService('POST', '/results', resultData)
}

// Delete result
export const deleteResultAPI = (id) => {
  return axiosService('DELETE', `/results/${id}`)
}