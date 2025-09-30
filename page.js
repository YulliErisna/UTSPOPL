'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [categories, setCategories] = useState([])
  const [totalMembers, setTotalMembers] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setCategories(data.categories || [])
      setTotalMembers(data.totalMembers || 0)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2><i className="fas fa-tachometer-alt me-2"></i>Dashboard</h2>
            <span className="badge bg-primary fs-6">Total Members: {totalMembers}</span>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Statistics Cards */}
        <div className="col-12 mb-4">
          <div className="row">
            {categories.map((category) => (
              <div key={category.id} className="col-md-3 col-sm-6 mb-3">
                <div className="card stats-card h-100">
                  <div className="card-body text-center">
                    <div className="stats-icon mb-3">
                      <i className="fas fa-users fa-2x text-primary"></i>
                    </div>
                    <h5 className="card-title text-primary">{category.name}</h5>
                    <h2 className="text-warning mb-0">{category.member_count}</h2>
                    <small className="text-muted">Members</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-bolt me-2"></i>Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 col-sm-6 mb-3">
                  <Link href="/members" className="btn btn-outline-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-user-plus fa-2x mb-2"></i>
                    <span>Add Member</span>
                  </Link>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <Link href="/categories" className="btn btn-outline-warning w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-tag fa-2x mb-2"></i>
                    <span>Add Category</span>
                  </Link>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <Link href="/reports" className="btn btn-outline-info w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-chart-line fa-2x mb-2"></i>
                    <span>View Reports</span>
                  </Link>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <Link href="/members" className="btn btn-outline-success w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-list fa-2x mb-2"></i>
                    <span>All Members</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-clock me-2"></i>System Overview</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-4">
                  <div className="p-3">
                    <i className="fas fa-database fa-3x text-primary mb-3"></i>
                    <h4>Database</h4>
                    <p className="text-muted">MySQL database with optimized queries</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3">
                    <i className="fas fa-shield-alt fa-3x text-warning mb-3"></i>
                    <h4>Security</h4>
                    <p className="text-muted">Secure data handling and validation</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3">
                    <i className="fas fa-mobile-alt fa-3x text-info mb-3"></i>
                    <h4>Responsive</h4>
                    <p className="text-muted">Mobile-friendly interface design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
