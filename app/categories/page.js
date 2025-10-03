'use client'

import { useState, useEffect } from 'react'
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
    } finally {
      setLoading(false)
    }
  }

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
            <h2><i className="fas fa-tags me-2"></i>Categories Management</h2>
            <button 
              className="btn btn-warning" 
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus me-1"></i>Add Category
            </button>
          </div>
        </div>
      </div>

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
            </div>
          </div>
        </div>
      </div>

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
            </div>
          </div>
        </div>
      </div>

      {/* Category Modal */}
      <CategoryModal
        show={showModal}
        onHide={handleModalClose}
        onSave={handleCategorySave}
        category={editingCategory}
      />
    </div>
  )
}
