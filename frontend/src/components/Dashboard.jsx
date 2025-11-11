import { useState, useEffect } from 'react'
import HabitForm from './HabitForm'
import HabitList from './HabitList'
import StreaksStats from './StreaksStats'

function Dashboard({
  currentUser,
  onLogout,
  getHabits,
  createHabit,
  deleteHabit,
  logHabitEntry,
  getHabitStreaks,
  getWeeklyStats
}) {
  const [habits, setHabits] = useState([])
  const [streaks, setStreaks] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [habitsData, streaksData] = await Promise.all([
        getHabits(),
        getHabitStreaks()
      ])
      setHabits(habitsData)
      setStreaks(streaksData)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateHabit = async (habitData) => {
    try {
      await createHabit(habitData)
      setMessage('Habit created successfully!')
      loadData()
    } catch (err) {
      setMessage(err.message)
    }
  }

  const handleDeleteHabit = async (habitId) => {
    if (window.confirm('Delete this habit?')) {
      try {
        await deleteHabit(habitId)
        setMessage('Habit deleted successfully!')
        loadData()
      } catch (err) {
        setMessage(err.message)
      }
    }
  }

  const handleLogHabit = async (habitId, date) => {
    try {
      await logHabitEntry(habitId, { date, completed: true })
      setMessage('Habit logged for today!')
      loadData()
    } catch (err) {
      setMessage(err.message)
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <>
      <div className="navbar">
        <h1>📋 Habit Tracker</h1>
        <div className="navbar-right">
          <span>{currentUser?.name || currentUser?.email}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="container">
        <div className="dashboard">
          <HabitForm onSubmit={handleCreateHabit} />

          <StreaksStats streaks={streaks} />

          <HabitList
            habits={habits}
            onDelete={handleDeleteHabit}
            onLog={handleLogHabit}
          />

          {message && (
            <div className={message.includes('success') ? 'success' : 'error'}>
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard