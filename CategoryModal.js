'use client'

import { useState, useEffect } from 'react'

// ================== PRESENTER ==================
function CategoryModalPresenter({ 
  formData, 
  loading, 
  onHide, 
  onChange, 
  onSubmit, 
  category 
}) {
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-tag me-2"></i>
              {category ? 'Edit Category' : 'Add Category'}
            </h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={onChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  id="description" 
                  name="description" 
                  rows="3"
                  value={formData.description}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>
                Cancel
              </button>
              <button type="submit" className="btn btn-warning" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-1"></i>
                    Save Category
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ================== CONTAINER ==================
export default function CategoryModal({ show, onHide, onSave, category }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || ''
      })
    } else {
      setFormData({
        name: '',
        description: ''
      })
    }
  }, [category])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = category ? `/api/categories/${category.id}` : '/api/categories'
      const method = category ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert(category ? 'Category updated successfully' : 'Category created successfully')
        onSave()
      } else {
        alert(data.message || 'Error saving category')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Error saving category')
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <CategoryModalPresenter 
      formData={formData}
      loading={loading}
      onHide={onHide}
      onChange={handleChange}
      onSubmit={handleSubmit}
      category={category}
    />
  )
}
