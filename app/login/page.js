'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        router.push('/')
        router.refresh()
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="fas fa-users fa-4x text-primary"></i>
                  </div>
                  <h2 className="fw-bold text-primary">Membership System</h2>
                  <p className="text-muted">Sign in to continue</p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-semibold">
                      <i className="fas fa-user me-2"></i>Username
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      <i className="fas fa-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                  <p className="mb-2 fw-semibold text-center">Demo Credentials:</p>
                  <small className="d-block text-muted">
                    <strong>Admin:</strong> admin / admin123<br/>
                  </small>
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <p className="text-white">
                <i className="fas fa-copyright me-1"></i>
                2025 Membership Management System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}