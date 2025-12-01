import db from '../../../../lib/db'
import moment from 'moment'

export async function POST(request) {
  try {
    const { period, start_date, end_date } = await request.json()
    
    let dateFilter = ''
    let params = []
    
    if (start_date && end_date) {
      dateFilter = 'WHERE DATE(m.created_at) BETWEEN ? AND ?'
      params = [start_date, end_date]
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
        default:
          start = now.startOf('month').format('YYYY-MM-DD')
          end = now.endOf('month').format('YYYY-MM-DD')
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
    
    // Generate HTML for PDF
    const html = generatePDFHTML(members, period, start_date, end_date)
    
    return Response.json({ 
      success: true, 
      html,
      members,
      period,
      start_date: params[0],
      end_date: params[1]
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return Response.json({ 
      success: false, 
      message: 'Error generating PDF' 
    }, { status: 500 })
  }
}

function generatePDFHTML(members, period, startDate, endDate) {
  const now = new Date().toLocaleString('id-ID')
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Members Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      padding: 20px;
      font-size: 12px;
    }
    .header { 
      text-align: center; 
      margin-bottom: 30px;
      border-bottom: 3px solid #007bff;
      padding-bottom: 15px;
    }
    .header h1 { 
      color: #007bff; 
      font-size: 24px;
      margin-bottom: 5px;
    }
    .header p { 
      color: #666; 
      font-size: 14px;
    }
    .info-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
    }
    .info-item {
      flex: 1;
    }
    .info-label {
      font-weight: bold;
      color: #333;
      margin-bottom: 3px;
    }
    .info-value {
      color: #666;
    }
    table { 
      width: 100%; 
      border-collapse: collapse;
      margin-top: 15px;
    }
    th { 
      background: linear-gradient(135deg, #007bff, #0056b3);
      color: white; 
      padding: 10px;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    td { 
      padding: 8px;
      border-bottom: 1px solid #e9ecef;
      font-size: 11px;
    }
    tr:nth-child(even) { 
      background-color: #f8f9fa; 
    }
    tr:hover {
      background-color: #fff3cd;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 3px;
      background: #ffc107;
      color: #333;
      font-weight: 500;
      font-size: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 2px solid #e9ecef;
      text-align: center;
      color: #666;
      font-size: 10px;
    }
    .summary {
      margin-top: 20px;
      padding: 15px;
      background: #e7f3ff;
      border-left: 4px solid #007bff;
      border-radius: 5px;
    }
    .summary-title {
      font-weight: bold;
      color: #007bff;
      margin-bottom: 8px;
      font-size: 14px;
    }
    @media print {
      body { padding: 10px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📊 MEMBERSHIP REPORT</h1>
    <p>Comprehensive Member Database Report</p>
  </div>

  <div class="info-section">
    <div class="info-item">
      <div class="info-label">Report Period</div>
      <div class="info-value">${period ? period.toUpperCase() : 'CUSTOM'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Date Range</div>
      <div class="info-value">${startDate || '-'} to ${endDate || '-'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Generated At</div>
      <div class="info-value">${now}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Total Records</div>
      <div class="info-value"><strong>${members.length}</strong></div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">No</th>
        <th style="width: 20%;">Name</th>
        <th style="width: 20%;">Email</th>
        <th style="width: 12%;">Phone</th>
        <th style="width: 13%;">Category</th>
        <th style="width: 20%;">Address</th>
        <th style="width: 10%;">Join Date</th>
      </tr>
    </thead>
    <tbody>
      ${members.map((member, index) => `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${member.name || '-'}</strong></td>
          <td>${member.email || '-'}</td>
          <td>${member.phone || '-'}</td>
          <td><span class="badge">${member.category_name || '-'}</span></td>
          <td>${member.address || '-'}</td>
          <td>${member.created_at ? new Date(member.created_at).toLocaleDateString('id-ID') : '-'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="summary">
    <div class="summary-title">Summary</div>
    <div>Total Members in this report: <strong>${members.length}</strong></div>
    <div>Report Type: <strong>${period ? period.toUpperCase() : 'Custom Date Range'}</strong></div>
  </div>

  <div class="footer">
    <p><strong>Membership Management System</strong></p>
    <p>© 2024 All Rights Reserved | Generated automatically by the system</p>
  </div>
</body>
</html>
  `
}