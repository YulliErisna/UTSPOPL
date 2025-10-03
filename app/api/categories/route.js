import db from '../../../lib/db'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page')) || 1
    const limit = 10
    const offset = (page - 1) * limit

    let query = 'SELECT * FROM categories'
    let countQuery = 'SELECT COUNT(*) as total FROM categories'
    let params = []

    if (search) {
      query += ' WHERE name LIKE ? OR description LIKE ?'
      countQuery += ' WHERE name LIKE ? OR description LIKE ?'
      params = [`%${search}%`, `%${search}%`]
    }

    query += ' ORDER BY name LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const [countResult] = await db.execute(countQuery, params.slice(0, -2))
    const totalCategories = countResult[0].total
    const totalPages = Math.ceil(totalCategories / limit)

    const [categories] = await db.execute(query, params)

    return Response.json({ 
      categories, 
      totalPages, 
      currentPage: page, 
      search 
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return Response.json({ 
      categories: [], 
      totalPages: 0, 
      currentPage: 1, 
      search: '' 
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, description } = await request.json()
    const query = 'INSERT INTO categories (name, description) VALUES (?, ?)'
    
    await db.execute(query, [name, description])
    
    return Response.json({ success: true, message: 'Category created successfully' })
  } catch (error) {
    console.error('Error creating category:', error)
    return Response.json({ success: false, message: 'Error creating category' }, { status: 500 })
  }
}
