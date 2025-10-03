import db from '../../../lib/db'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page')) || 1
    const limit = 10
    const offset = (page - 1) * limit

    let query = `
      SELECT m.*, c.name as category_name 
      FROM members m 
      LEFT JOIN categories c ON m.category_id = c.id
    `
    let countQuery = 'SELECT COUNT(*) as total FROM members m'
    let params = []

    if (search) {
      query += ' WHERE m.name LIKE ? OR m.email LIKE ? OR m.phone LIKE ?'
      countQuery += ' WHERE m.name LIKE ? OR m.email LIKE ? OR m.phone LIKE ?'
      params = [`%${search}%`, `%${search}%`, `%${search}%`]
    }

    query += ' ORDER BY m.created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const [countResult] = await db.execute(countQuery, params.slice(0, -2))
    const totalMembers = countResult[0].total
    const totalPages = Math.ceil(totalMembers / limit)

    const [members] = await db.execute(query, params)

    return Response.json({ 
      members, 
      totalPages, 
      currentPage: page, 
      search 
    })
  } catch (error) {
    console.error('Error fetching members:', error)
    return Response.json({ 
      members: [], 
      totalPages: 0, 
      currentPage: 1, 
      search: '' 
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, email, phone, address, category_id } = await request.json()
    const query = 'INSERT INTO members (name, email, phone, address, category_id) VALUES (?, ?, ?, ?, ?)'
    
    await db.execute(query, [name, email, phone, address, category_id])
    
    return Response.json({ success: true, message: 'Member created successfully' })
  } catch (error) {
    console.error('Error creating member:', error)
    return Response.json({ success: false, message: 'Error creating member' }, { status: 500 })
  }
}
