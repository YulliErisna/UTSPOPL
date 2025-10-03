import db from '../../../../lib/db'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { name, email, phone, address, category_id } = await request.json()
    const query = 'UPDATE members SET name = ?, email = ?, phone = ?, address = ?, category_id = ? WHERE id = ?'
    
    await db.execute(query, [name, email, phone, address, category_id, id])
    
    return Response.json({ success: true, message: 'Member updated successfully' })
  } catch (error) {
    console.error('Error updating member:', error)
    return Response.json({ success: false, message: 'Error updating member' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const query = 'DELETE FROM members WHERE id = ?'
    
    await db.execute(query, [id])
    
    return Response.json({ success: true, message: 'Member deleted successfully' })
  } catch (error) {
    console.error('Error deleting member:', error)
    return Response.json({ success: false, message: 'Error deleting member' }, { status: 500 })
  }
}
