import React from 'react'
import API_BASE_URL from '../config/api'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null)
  const [accessToken, setAccessToken] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const login = (token, userData) => {
    setAccessToken(token)
    setUser(userData)
  }

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Logout error:', err)
    }

    setUser(null)
    setAccessToken(null)
  }

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      })

      if (res.ok) {
        const data = await res.json()
        login(data.token, data.user)
        return data.token
      } else {
        logout()
        return null
      }
    } catch (err) {
      console.error('Refresh token error:', err)
      logout()
      return null
    }
  }

  React.useEffect(() => {
    refreshAccessToken().finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
