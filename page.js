'use client'

import { useState, useEffect } from 'react'
 feat_categories-ui/30-09-2025
import CategoryModal from '../../components/CategoryModal'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [currentPage, search])

  const fetchCategories = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        search: search
      })
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
    } finally {
      setLoading(false)
    }
  }

 feat_categories-ui/30-09-2025
  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchCategories()
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setShowModal(true)
  }

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        const response = await fetch(`/api/categories/${id}`, {
          method: 'DELETE'
        })
        const data = await response.json()
        
        if (data.success) {
          alert('Category deleted successfully')
          fetchCategories()
        } else {
          alert('Error deleting category')
        }
      } catch (error) {
        console.error('Error deleting category:', error)
        alert('Error deleting category')
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingCategory(null)
  }

  const handleCategorySave = () => {
    fetchCategories()
    handleModalClose()
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB')
  }


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
          </div>
        </div>
      </div>

 feat_categories-ui/30-09-2025
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
                      placeholder="Search categories by name or description..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-outline-warning me-2">
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
            </div>
          </div>
        </div>
      </div>

 feat_categories-ui/30-09-2025
      {/* Categories Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
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
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
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
                            <td>
                              <div className="btn-group" role="group">
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-warning"
                                  onClick={() => handleEdit(category)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(category.id, category.name)}
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
                    <nav aria-label="Categories pagination">
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
            </div>
          </div>
        </div>
      </div>
 feat_categories-ui/30-09-2025

      {/* Category Modal */}
      <CategoryModal
        show={showModal}
        onHide={handleModalClose}
        onSave={handleCategorySave}
        category={editingCategory}
      />

 main
    </div>
  )
}
