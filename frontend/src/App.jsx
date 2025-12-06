import { Login } from './pages/login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/register'
import { JobList } from './components/jobList'
import { PostJob } from './pages/addJobForm'
import { Details } from './components/jobDetails'
import { Apply } from './components/applicationForm'
import ProtectedRoute from './auth/protectedRoutes'
import { CandidateDashboard } from './pages/candidateDashboard'
import { RecruiterDashboard } from './pages/recruiterDashboard'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/register" element={<Register />} />

          <Route path="/jobList" element={<JobList />} />

          <Route path="/jobForm" element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          } />

          <Route path='/jobDetails/:id' element={<Details />} />

          <Route path='/apply/:id' element={
            <ProtectedRoute>
              <Apply />
            </ProtectedRoute>
          } />

          <Route path='/candidateDashboard' element={
            <ProtectedRoute>
              <CandidateDashboard />
            </ProtectedRoute>
          } />

          <Route path='/recruiterDashboard' element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}
