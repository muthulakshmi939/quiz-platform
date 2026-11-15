import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import ProtectedRoute from './components/ProtectedRoute'
import StudentLayout from './components/StudentLayout'

// Student pages
import QuizList from './pages/QuizList'
import QuizPage from './pages/QuizPage'
import Result from './pages/Result'
import History from './pages/History'
import Leaderboard from './pages/Leaderboard'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AddQuestion from './pages/admin/AddQuestion'
import ViewQuestions from './pages/admin/ViewQuestions'
import EditQuestion from './pages/admin/EditQuestion'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student protected routes */}
      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route element={<StudentLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<History />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Route>

      {/* Admin protected routes */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-question" element={<AddQuestion />} />
        <Route path="/admin/questions" element={<ViewQuestions />} />
        <Route path="/admin/edit-question/:id" element={<EditQuestion />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App