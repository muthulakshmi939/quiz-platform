
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ allowedRole }) {
  const { isAuthenticated, role } = useSelector(
    (state) => state.auth
  )

  // If user is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If user role is not allowed
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
