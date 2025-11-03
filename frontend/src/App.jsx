import { Login } from "./pages/login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Register } from "./pages/register"
import { JobCard } from "./components/jobCard"
import { JobList } from "./components/jobList"
import { PostJob } from "./pages/addJobForm"


export default function App() {


  return (

    <>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Login />
          } />

          <Route path="/" element={
            <Navigate to="/login" />
          } />

          <Route path="/register" element={
            <Register />
          } />

          <Route path="/jobCard" element={
            <JobCard />
          } />

          <Route path="/jobList" element={
            <JobList />
          } />

          <Route path="/jobForm" element={
            <PostJob />
          } />

        </Routes>



      </BrowserRouter>
    </>


  )
}
