import React from 'react'
import '../styles/navigation.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/authContext'

export function Navigation() {
    const [open, setOpen] = React.useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleChange = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
        setOpen(false)
    }

    const closeMenu = () => {
        setOpen(false)
    }

    return (
        <nav className="navContainer">
            <div className="logo">
                <h1>TalentTrack</h1>
            </div>

            <div className="hamburgerMenu">
                <button className="hamburger" onClick={handleChange}>
                    ☰
                </button>
            </div>

            <div className={`navLinks ${open ? 'open' : ''}`}>
                {user && (
                    <>
                        <Link to="/jobList" onClick={closeMenu}>
                            Browse Jobs
                        </Link>
                        {user.role === 'candidate' && (
                            <Link to="/candidateDashboard" onClick={closeMenu}>
                                My Applications
                            </Link>
                        )}
                        {user.role === 'employer' && (
                            <>
                                <Link to="/addJob" onClick={closeMenu}>
                                    Post Job
                                </Link>
                                <Link to="/recruiterDashboard" onClick={closeMenu}>
                                    Dashboard
                                </Link>
                            </>
                        )}
                        <Link to="/profile" onClick={closeMenu}>
                            Profile
                        </Link>
                        <button onClick={handleLogout} className="logoutButton">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}
