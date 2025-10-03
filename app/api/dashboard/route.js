import db from '../../../lib/db'

export async function GET() {
  try {
    const query = `
      SELECT c.id, c.name, COUNT(m.id) as member_count 
      FROM categories c 
      LEFT JOIN members m ON c.id = m.category_id 
      GROUP BY c.id, c.name
    `
    
    const [categories] = await db.execute(query)
    const totalMembers = categories.reduce((sum, cat) => sum + cat.member_count, 0)
    
    return Response.json({ categories, totalMembers })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return Response.json({ categories: [], totalMembers: 0 }, { status: 500 })
  }
}
