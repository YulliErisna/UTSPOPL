import db from '../../../lib/db'
import moment from 'moment'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'month'
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    
    let dateFilter = ''
    let params = []
    
    if (startDate && endDate) {
      dateFilter = 'WHERE DATE(m.created_at) BETWEEN ? AND ?'
      params = [startDate, endDate]
    } else {
      const now = moment()
      let start, end
      
      switch (period) {
        case 'day':
          start = now.startOf('day').format('YYYY-MM-DD')
          end = now.endOf('day').format('YYYY-MM-DD')
          break
        case 'week':
          start = now.startOf('week').format('YYYY-MM-DD')
          end = now.endOf('week').format('YYYY-MM-DD')
          break
        case 'month':
          start = now.startOf('month').format('YYYY-MM-DD')
          end = now.endOf('month').format('YYYY-MM-DD')
          break
        case 'year':
          start = now.startOf('year').format('YYYY-MM-DD')
          end = now.endOf('year').format('YYYY-MM-DD')
          break
      }
      
      dateFilter = 'WHERE DATE(m.created_at) BETWEEN ? AND ?'
      params = [start, end]
    }
    
    const query = `
      SELECT m.*, c.name as category_name 
      FROM members m 
      LEFT JOIN categories c ON m.category_id = c.id
      ${dateFilter}
      ORDER BY m.created_at DESC
    `
    
    const [members] = await db.execute(query, params)
    
    return Response.json({ 
      members, 
      period, 
      startDate, 
      endDate 
    })
  } catch (error) {
    console.error('Error fetching report data:', error)
    return Response.json({ 
      members: [], 
      period: 'month', 
      startDate: '', 
      endDate: '' 
    }, { status: 500 })
  }
}
