import '../styles/form.css'
import styles from '../styles/login.module.css'
import { HiArrowLongLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../auth/authContext'
import API_BASE_URL from '../config/api'

export function Login() {
  const navigate = useNavigate()

  function handleNavigate() {
    navigate('/register')
  }

  const { login } = useAuth();


  const [form, setForm] = React.useState({
    email: '',
    password: '',
    remember: false,
  })

  const [error, setError] = React.useState({})

  const errors = {
    email: (value) => {
      if (!value) {
        return 'Enter Your email'
      } else {
        return ''
      }
    },

    password: (value) => {
      if (!value) {
        return 'Enter Your password'
      } else {
        return ''
      }
    },
  }

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleError = (e) => {
    const { name, value } = e.target

    const errMessage = errors[name]?.(value)

    setError((prev) => ({
      ...prev,
      [name]: errMessage,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      })

      const details = await res.json()

      if (res.ok) {
        login(details.token, details.user)
        navigate('/jobList') 
      } else {
        setError((prev) => ({
          ...prev,
          password: details.message || details.error,
        }))
      }
      return details
    } catch (err) {
      console.error(err)
      setError((prev) => ({
        ...prev,
        password: 'Server error, try again later',
      }))
    }
  }

  return (
    <main className={styles.loginForm}>
      <h3>TalentTrack</h3>
      <p className={styles.headMessage}>Welcome back to your hiring platform</p>

      <section className="formCard">
        <p className={styles.formHeading}>Sign In</p>
        <p className={styles.formMessage}>
          Enter your credentials to access your account
        </p>

        <form method="POST" onSubmit={handleSubmit} className="formBody">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleError}
            required
          />
          {error.email && <p className="error">{error.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleError}
            required
          />
          {error.password && <p className="error">{error.password}</p>}

          <label htmlFor="remember">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            Remember me
          </label>

          <button type="submit" className={styles.signIn}>
            Sign In
          </button>
          <p className={styles.forgot}>Forgot your password?</p>
          <hr />
          <p className={styles.account}>Don't have an account?</p>
          <button
            type="button"
            className={styles.createAcc}
            onClick={handleNavigate}
          >
            Create Account
          </button>
        </form>
      </section>

      <button className={styles.back}>
        <HiArrowLongLeft /> <span>Back to Home</span>
      </button>
    </main>
  )
}
