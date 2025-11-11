import { useState } from 'react'

function LoginPage({ onLogin, signup, login }) {
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      let data
      if (isSignup) {
        data = await signup(formData.email, formData.password, formData.name)
      } else {
        data = await login(formData.email, formData.password)
      }

      onLogin(data.token, data.user)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="auth-form">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

      {message && (
        <div className={message.includes('success') ? 'success' : 'error'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : (isSignup ? 'Sign Up' : 'Login')}
        </button>
      </form>

      <button
        className="toggle-btn"
        onClick={() => setIsSignup(!isSignup)}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        {isSignup ? 'Already have account? Login' : 'Need account? Sign Up'}
      </button>
    </div>
  )
}

export default LoginPage