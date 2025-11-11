import { useState } from 'react'

function HabitForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'fitness',
    frequency: 'daily',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    onSubmit(formData)
    setFormData({
      name: '',
      category: 'fitness',
      frequency: 'daily',
      description: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="card">
      <h3>Add New Habit</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Habit Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Morning Run"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="fitness">Fitness</option>
              <option value="health">Health</option>
              <option value="productivity">Productivity</option>
              <option value="learning">Learning</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Frequency</label>
            <select name="frequency" value={formData.frequency} onChange={handleChange}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
          />
        </div>

        <button type="submit">Create Habit</button>
      </form>
    </div>
  )
}

export default HabitForm