import { Login } from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './pages/register'
import { JobList } from './components/jobList'
import { PostJob } from './pages/addJobForm'
import { Details } from './components/jobDetails'
import { Apply } from './components/applicationForm'
import ProtectedRoute from './auth/protectedRoutes'
import { CandidateDashboard } from './pages/candidateDashboard'
import { RecruiterDashboard } from './pages/recruiterDashboard'
import { Navigation } from './components/Navigation'
import { Profile } from './pages/Profile'
import { Footer } from './components/Footer'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Privacy } from './pages/Privacy'
import { Home } from './pages/Home'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
              <Home />
            </>
          } />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Register />} />

          <Route path="/jobList" element={
            <>
              <Navigation />
              <JobList />
            </>
          } />

          <Route path="/addJob" element={
            <ProtectedRoute>
              <Navigation />
              <PostJob />
            </ProtectedRoute>
          } />

          <Route path='/jobDetails/:id' element={
            <>
              <Navigation />
              <Details />
            </>
          } />

          <Route path='/apply/:id' element={
            <ProtectedRoute>
              <Navigation />
              <Apply />
            </ProtectedRoute>
          } />

          <Route path='/candidateDashboard' element={
            <ProtectedRoute>
              <Navigation />
              <CandidateDashboard />
            </ProtectedRoute>
          } />

          <Route path='/recruiterDashboard' element={
            <ProtectedRoute>
              <Navigation />
              <RecruiterDashboard />
            </ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute>
              <Navigation />
              <Profile />
            </ProtectedRoute>
          } />

          <Route path='/about' element={
            <>
              <Navigation />
              <About />
            </>
          } />

          <Route path='/contact' element={
            <>
              <Navigation />
              <Contact />
            </>
          } />

          <Route path='/privacy' element={
            <>
              <Navigation />
              <Privacy />
            </>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
