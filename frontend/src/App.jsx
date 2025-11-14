import { Login } from './pages/login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/register'
import { JobList } from './components/jobList'
import { PostJob } from './pages/addJobForm'
import { Details } from './components/jobDetails'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/register" element={<Register />} />

          <Route path="/jobList" element={<JobList />} />

          <Route path="/jobForm" element={<PostJob />} />

          <Route path='/jobDetails/:id' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
