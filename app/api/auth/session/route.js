import { getSession } from '../../../../lib/auth'

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return Response.json({ 
        success: false, 
        authenticated: false 
      })
    }

    return Response.json({ 
      success: true, 
      authenticated: true,
      user: session.user
    })
  } catch (error) {
    console.error('Session check error:', error)
    return Response.json({ 
      success: false, 
      authenticated: false 
    }, { status: 500 })
  }
}