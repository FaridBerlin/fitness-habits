function HabitList({ habits, onDelete, onLog }) {
  if (!habits || habits.length === 0) {
    return (
      <div className="card">
        <h3>Your Habits</h3>
        <p>No habits yet. Create one to get started!</p>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="card">
      <h3>Your Habits</h3>
      {habits.map(habit => (
        <div key={habit._id} className="habit-item">
          <div className="habit-info">
            <h5>
              {habit.name}
              <span className="streak-badge">{habit.category}</span>
            </h5>
            <div className="habit-meta">
              Frequency: {habit.frequency} • {habit.description || 'No description'}
            </div>
          </div>
          <div className="habit-actions">
            <button
              className="btn-small"
              onClick={() => onLog(habit._id, today)}
            >
              ✓ Log Today
            </button>
            <button
              className="btn-small btn-delete"
              onClick={() => onDelete(habit._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HabitList