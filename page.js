'use client'

import { useState, useEffect } from 'react'
import MemberModal from '../../components/MemberModal'

export default function Members() {
  const [members, setMembers] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState(null)

  useEffect(() => {
    fetchMembers()
    fetchCategories()
  }, [currentPage, search])

  const fetchMembers = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        search: search
      })
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
    setShowModal(true)
  }

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete member "${name}"?`)) {
      try {
        const response = await fetch(`/api/members/${id}`, {
          method: 'DELETE'
        })
        const data = await response.json()
        
        if (data.success) {
          alert('Member deleted successfully')
          fetchMembers()
        } else {
          alert('Error deleting member')
        }
      } catch (error) {
        console.error('Error deleting member:', error)
        alert('Error deleting member')
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingMember(null)
  }

  const handleMemberSave = () => {
    fetchMembers()
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
            <h2><i className="fas fa-users me-2"></i>Members Management</h2>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus me-1"></i>Add Member
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
                      placeholder="Search members by name, email, or phone..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-outline-primary me-2">
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

      {/* Members Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
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
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
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
                            <td>
                              <div className="btn-group" role="group">
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-warning"
                                  onClick={() => handleEdit(member)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(member.id, member.name)}
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
                    <nav aria-label="Members pagination">
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
            </div>
          </div>
        </div>
      </div>

      {/* Member Modal */}
      <MemberModal
        show={showModal}
        onHide={handleModalClose}
        onSave={handleMemberSave}
        member={editingMember}
        categories={categories}
      />
    </div>
  )
}
