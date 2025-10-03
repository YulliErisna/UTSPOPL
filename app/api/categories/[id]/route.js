import db from '../../../../lib/db'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { name, description } = await request.json()
    const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?'
    
    await db.execute(query, [name, description, id])
    
    return Response.json({ success: true, message: 'Category updated successfully' })
  } catch (error) {
    console.error('Error updating category:', error)
    return Response.json({ success: false, message: 'Error updating category' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const query = 'DELETE FROM categories WHERE id = ?'
    
    await db.execute(query, [id])
    
    return Response.json({ success: true, message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return Response.json({ success: false, message: 'Error deleting category' }, { status: 500 })
  }
}
