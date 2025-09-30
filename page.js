'use client'

import { useState, useEffect } from 'react'
 feat_members-ui/30-09-2025
import MemberModal from '../../components/MemberModal'

export default function Members() {
  const [members, setMembers] = useState([])

 feat_reports-ui/30-09-2025

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

 feat_categories-ui/30-09-2025
import CategoryModal from '../../components/CategoryModal'

export default function Categories() {
 main
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [showModal, setShowModal] = useState(false)
 feat_members-ui/30-09-2025
  const [editingMember, setEditingMember] = useState(null)

  useEffect(() => {
    fetchMembers()
    fetchCategories()
  }, [currentPage, search])

  const fetchMembers = async () => {

  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [currentPage, search])

  const fetchCategories = async () => {
 main
    try {
      const params = new URLSearchParams({
        page: currentPage,
        search: search
      })
 feat_members-ui/30-09-2025
      const response = await fetch(`/api/members?${params}`)
      const data = await response.json()
      setMembers(data.members || [])
      setTotalPages(data.totalPages || 0)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchMembers()
  }

  const handleEdit = (member) => {
    setEditingMember(member)

      const response = await fetch(`/api/categories?${params}`)
      const data = await response.json()
      setCategories(data.categories || [])
      setTotalPages(data.totalPages || 0)
    } catch (error) {
      console.error('Error fetching categories:', error)

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
 main
 main
    } finally {
      setLoading(false)
    }
  }

 feat_reports-ui/30-09-2025
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

 feat_categories-ui/30-09-2025
  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchCategories()
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
 main
    setShowModal(true)
  }

  const handleDelete = async (id, name) => {
 feat_members-ui/30-09-2025
    if (confirm(`Are you sure you want to delete member "${name}"?`)) {
      try {
        const response = await fetch(`/api/members/${id}`, {

    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        const response = await fetch(`/api/categories/${id}`, {
 main
          method: 'DELETE'
        })
        const data = await response.json()
        
        if (data.success) {
 feat_members-ui/30-09-2025
          alert('Member deleted successfully')
          fetchMembers()
        } else {
          alert('Error deleting member')
        }
      } catch (error) {
        console.error('Error deleting member:', error)
        alert('Error deleting member')

          alert('Category deleted successfully')
          fetchCategories()
        } else {
          alert('Error deleting category')
        }
      } catch (error) {
        console.error('Error deleting category:', error)
        alert('Error deleting category')
 main
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
 feat_members-ui/30-09-2025
    setEditingMember(null)
  }

  const handleMemberSave = () => {
    fetchMembers()
    handleModalClose()

    setEditingCategory(null)
  }

  const handleCategorySave = () => {
    fetchCategories()
    handleModalClose()
 main
 main
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB')
  }

 feat_members-ui/30-09-2025

 feat_reports-ui/30-09-2025


 main
 main
 main
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
 feat_members-ui/30-09-2025
            <h2><i className="fas fa-users me-2"></i>Members Management</h2>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus me-1"></i>Add Member
            </button>

 feat_reports-ui/30-09-2025
            <h2><i className="fas fa-chart-bar me-2"></i>Reports</h2>
            <div className="btn-group">
              <button className="btn btn-success" onClick={exportToPDF}>
                <i className="fas fa-file-pdf me-1"></i>Export PDF
              </button>
              <button className="btn btn-info" onClick={printReport}>
                <i className="fas fa-print me-1"></i>Print
              </button>
            </div>

 feat_categories-ui/30-09-2025
            <h2><i className="fas fa-tags me-2"></i>Categories Management</h2>
            <button 
              className="btn btn-warning" 
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus me-1"></i>Add Category
            </button>
  
            <h2><i className="fas fa-tachometer-alt me-2"></i>Dashboard</h2>
            <span className="badge bg-primary fs-6">Total Members: {totalMembers}</span>
 main
 main
 main
          </div>
        </div>
      </div>

 feat_members-ui/30-09-2025

 feat_reports-ui/30-09-2025
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

 feat_categories-ui/30-09-2025
 main
      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSearch} className="row g-3">
                <div className="col-md-8">
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                    <input 
                      type="text" 
                      className="form-control" 
 feat_members-ui/30-09-2025
                      placeholder="Search members by name, email, or phone..." 

                      placeholder="Search categories by name or description..." 
 main
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
 feat_members-ui/30-09-2025
                  <button type="submit" className="btn btn-outline-primary me-2">

                  <button type="submit" className="btn btn-outline-warning me-2">
 main
                    <i className="fas fa-search me-1"></i>Search
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setSearch('')
                      setCurrentPage(1)
                    }}
                  >
                    <i className="fas fa-times me-1"></i>Clear
                  </button>
                </div>
              </form>
 feat_members-ui/30-09-2025


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
 main
 main
 main
            </div>
          </div>
        </div>
      </div>

 feat_members-ui/30-09-2025
      {/* Members Table */}

 feat_reports-ui/30-09-2025
      {/* Report Data */}

 feat_categories-ui/30-09-2025
      {/* Categories Table */}
 main
 main
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
 feat_members-ui/30-09-2025
              <h5 className="mb-0"><i className="fas fa-list me-2"></i>Members List</h5>
            </div>
            <div className="card-body">
              {members.length > 0 ? (
                <>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-primary">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Category</th>
                          <th>Address</th>
                          <th>Created</th>

 feat_reports-ui/30-09-2025
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

              <h5 className="mb-0"><i className="fas fa-list me-2"></i>Categories List</h5>
            </div>
            <div className="card-body">
              {categories.length > 0 ? (
                <>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-warning">
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Created</th>
                          <th>Updated</th>
 main
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
 feat_members-ui/30-09-2025
                        {members.map((member) => (
                          <tr key={member.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar me-2">
                                  <i className="fas fa-user-circle fa-2x text-primary"></i>
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

                        {categories.map((category) => (
                          <tr key={category.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar me-2">
                                  <i className="fas fa-tag fa-2x text-warning"></i>
                                </div>
                                <div>
                                  <strong>{category.name}</strong>
                                </div>
                              </div>
                            </td>
                            <td>{category.description}</td>
                            <td>{formatDate(category.created_at)}</td>
                            <td>{formatDate(category.updated_at)}</td>
 main
                            <td>
                              <div className="btn-group" role="group">
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-warning"
 feat_members-ui/30-09-2025
                                  onClick={() => handleEdit(member)}

                                  onClick={() => handleEdit(category)}
 main
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
 feat_members-ui/30-09-2025
                                  onClick={() => handleDelete(member.id, member.name)}

                                  onClick={() => handleDelete(category.id, category.name)}
 main
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
 feat_members-ui/30-09-2025
                    <nav aria-label="Members pagination">

                    <nav aria-label="Categories pagination">
 main
                      <ul className="pagination justify-content-center">
                        {currentPage > 1 && (
                          <li className="page-item">
                            <button 
                              className="page-link" 
                              onClick={() => setCurrentPage(currentPage - 1)}
                            >
                              Previous
                            </button>
                          </li>
                        )}
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          </li>
                        ))}
                        
                        {currentPage < totalPages && (
                          <li className="page-item">
                            <button 
                              className="page-link" 
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              Next
                            </button>
                          </li>
                        )}
                      </ul>
                    </nav>
                  )}
                </>
              ) : (
                <div className="text-center py-5">
 feat_members-ui/30-09-2025
                  <i className="fas fa-users fa-4x text-muted mb-3"></i>
                  <h5 className="text-muted">No members found</h5>
                  <p className="text-muted">Start by adding your first member!</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-plus me-1"></i>Add Member
                  </button>
                </div>
              )}

                  <i className="fas fa-tags fa-4x text-muted mb-3"></i>
                  <h5 className="text-muted">No categories found</h5>
                  <p className="text-muted">Start by adding your first category!</p>
                  <button 
                    className="btn btn-warning" 
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-plus me-1"></i>Add Category
                  </button>
                </div>
              )}

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
 main
 main
            </div>
          </div>
        </div>
      </div>
 feat_members-ui/30-09-2025

      {/* Member Modal */}
      <MemberModal
        show={showModal}
        onHide={handleModalClose}
        onSave={handleMemberSave}
        member={editingMember}
        categories={categories}
      />

 feat_categories-ui/30-09-2025

      {/* Category Modal */}
      <CategoryModal
        show={showModal}
        onHide={handleModalClose}
        onSave={handleCategorySave}
        category={editingCategory}
      />

 main
 main
 main
    </div>
  )
}
