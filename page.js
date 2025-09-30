'use client'

import { useState, useEffect } from 'react'

export default function Reports() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('month')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    updateDateRange()
  }, [period])

  useEffect(() => {
    fetchReports()
  }, [period, startDate, endDate])

  const updateDateRange = () => {
    const today = new Date()
    let start, end

    switch (period) {
      case 'day':
        start = new Date(today)
        end = new Date(today)
        break
      case 'week':
        start = new Date(today)
        start.setDate(today.getDate() - today.getDay())
        end = new Date(start)
        end.setDate(start.getDate() + 6)
        break
      case 'month':
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        break
      case 'year':
        start = new Date(today.getFullYear(), 0, 1)
        end = new Date(today.getFullYear(), 11, 31)
        break
      default:
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    }

    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }

  const fetchReports = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        period,
        start_date: startDate,
        end_date: endDate
      })
      const response = await fetch(`/api/reports?${params}`)
      const data = await response.json()
      setMembers(data.members || [])
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = (e) => {
    e.preventDefault()
    fetchReports()
  }

  const exportToPDF = () => {
    alert('PDF export feature will be implemented with Puppeteer!')
  }

  const printReport = () => {
    window.print()
  }

  const exportToExcel = () => {
    alert('Excel export feature coming soon!')
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB')
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
            <h2><i className="fas fa-chart-bar me-2"></i>Reports</h2>
            <div className="btn-group">
              <button className="btn btn-success" onClick={exportToPDF}>
                <i className="fas fa-file-pdf me-1"></i>Export PDF
              </button>
              <button className="btn btn-info" onClick={printReport}>
                <i className="fas fa-print me-1"></i>Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-filter me-2"></i>Report Filters</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleGenerateReport} className="row g-3">
                <div className="col-md-3">
                  <label htmlFor="period" className="form-label">Period</label>
                  <select 
                    className="form-select" 
                    id="period" 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option value="day">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="start_date" className="form-label">Start Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="start_date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="end_date" className="form-label">End Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="end_date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">&nbsp;</label>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-search me-1"></i>Generate Report
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-chart-pie me-2"></i>Report Summary</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fas fa-users fa-3x text-primary mb-3"></i>
                    <h4>{members.length}</h4>
                    <p className="text-muted">Total Members</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fas fa-calendar fa-3x text-warning mb-3"></i>
                    <h4>{period}</h4>
                    <p className="text-muted">Report Period</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fas fa-clock fa-3x text-info mb-3"></i>
                    <h4>{new Date().toLocaleString()}</h4>
                    <p className="text-muted">Generated At</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fas fa-download fa-3x text-success mb-3"></i>
                    <h4>PDF</h4>
                    <p className="text-muted">Export Format</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Data */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-table me-2"></i>Members Report</h5>
            </div>
            <div className="card-body">
              {members.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover" id="reportTable">
                    <thead className="table-primary">
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Category</th>
                        <th>Address</th>
                        <th>Created Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, index) => (
                        <tr key={member.id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <i className="fas fa-user-circle fa-lg text-primary"></i>
                              </div>
                              <div>
                                <strong>{member.name}</strong>
                              </div>
                            </div>
                          </td>
                          <td>{member.email}</td>
                          <td>{member.phone}</td>
                          <td>
                            <span className="badge bg-warning">{member.category_name}</span>
                          </td>
                          <td>{member.address}</td>
                          <td>{formatDate(member.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-chart-bar fa-4x text-muted mb-3"></i>
                  <h5 className="text-muted">No data found</h5>
                  <p className="text-muted">Try adjusting your filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Report Actions */}
      {members.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="mb-3">Export Options</h5>
                <div className="btn-group" role="group">
                  <button className="btn btn-success" onClick={exportToPDF}>
                    <i className="fas fa-file-pdf me-1"></i>Export as PDF
                  </button>
                  <button className="btn btn-info" onClick={printReport}>
                    <i className="fas fa-print me-1"></i>Print Report
                  </button>
                  <button className="btn btn-primary" onClick={exportToExcel}>
                    <i className="fas fa-file-excel me-1"></i>Export as Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
