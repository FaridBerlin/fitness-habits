import { useState, useEffect } from 'react'
import './styles.css'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'

const API_URL = 'http://localhost:5000'

function App() {
  const [currentToken, setCurrentToken] = useState(localStorage.getItem('token'))
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  )

  // API call helper
  const apiCall = async (endpoint, method = 'GET', body = null) => {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    }
    if (currentToken) {
      options.headers.Authorization = `Bearer ${currentToken}`
    }
    if (body) {
      options.body = JSON.stringify(body)
    }
    const res = await fetch(`${API_URL}${endpoint}`, options)
    if (!res.ok) throw new Error((await res.json()).error || 'API Error')
    return res.json()
  }

  // Auth functions
  const signup = async (email, password, name) => {
    return apiCall('/api/auth/signup', 'POST', { email, password, name })
  }

  const login = async (email, password) => {
    return apiCall('/api/auth/login', 'POST', { email, password })
  }

  // Habit functions
  const getHabits = () => apiCall('/api/habits')
  const createHabit = (habit) => apiCall('/api/habits', 'POST', habit)
  const deleteHabit = (id) => apiCall(`/api/habits/${id}`, 'DELETE')
  const logHabitEntry = (habitId, entry) => apiCall(`/api/habits/${habitId}/entries`, 'POST', entry)

  // Stats functions
  const getHabitStreaks = () => apiCall('/api/stats/habit-streaks')
  const getWeeklyStats = () => apiCall('/api/stats/weekly')

  const handleLogin = (token, user) => {
    setCurrentToken(token)
    setCurrentUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentToken(null)
    setCurrentUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (!currentToken) {
    return <LoginPage onLogin={handleLogin} signup={signup} login={login} />
  }

  return (
    <Dashboard
      currentUser={currentUser}
      onLogout={handleLogout}
      getHabits={getHabits}
      createHabit={createHabit}
      deleteHabit={deleteHabit}
      logHabitEntry={logHabitEntry}
      getHabitStreaks={getHabitStreaks}
      getWeeklyStats={getWeeklyStats}
    />
  )
}

export default App