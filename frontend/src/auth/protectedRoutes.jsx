import { Navigate } from 'react-router-dom'
import { useAuth } from './authContext'
import { Loading } from '../components/Loading'

export default function ProtectedRoute({ children, role }) {
  const { accessToken, user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  if (role && user?.role !== role) {
    const redirect = user?.role === 'employer' ? '/recruiterDashboard' : '/candidateDashboard'
    return <Navigate to={redirect} replace />
  }

  return children
}
