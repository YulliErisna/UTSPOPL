'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session')
      const data = await response.json()
      
      if (data.authenticated) {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Session check error:', error)
    }
  }

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (data.success) {
        router.push('/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
      alert('Failed to logout')
    } finally {
      setLoading(false)
    }
  }

  // Don't show navigation on login page
  if (pathname === '/login') {
    return null
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/">
          <i className="fas fa-users me-2"></i>
          Membership System
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fas fa-tachometer-alt me-1"></i>Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/members">
                <i className="fas fa-users me-1"></i>Members
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/categories">
                <i className="fas fa-tags me-1"></i>Categories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">
                <i className="fas fa-chart-bar me-1"></i>Reports
              </a>
            </li>
            
            {user && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                  <i className="fas fa-user-circle me-1"></i>
                  {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text">
                      <small className="text-muted">Signed in as</small><br/>
                      <strong>{user.username}</strong>
                      <span className="badge bg-primary ms-2">{user.role}</span>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider"/></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                      disabled={loading}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      {loading ? 'Logging out...' : 'Logout'}
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}