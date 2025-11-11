function StreaksStats({ streaks }) {
  if (!streaks || streaks.length === 0) {
    return (
      <div className="card">
        <h3>📈 Streaks & Stats</h3>
        <p>No habits yet. Create your first habit to see stats!</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h3>📈 Streaks & Stats</h3>
      <div className="stats-grid">
        {streaks.map(streak => (
          <div key={streak.habitId} className="stat-box">
            <h4>{streak.habitName}</h4>
            <div className="value">{streak.currentStreak}</div>
            <div style={{ fontSize: '0.85rem' }}>Current Streak</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
              {streak.allTimeStreak} total completed
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StreaksStats