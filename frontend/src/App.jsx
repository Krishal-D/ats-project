import { Login } from "./pages/login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Register } from "./pages/register"
import { JobCard } from "./components/jobCard"


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
        </Routes>



      </BrowserRouter>
    </>


  )
}
