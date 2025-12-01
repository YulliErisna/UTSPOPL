import { cookies } from 'next/headers'
import { deleteSession, getSession, logActivity } from '../../../../lib/auth'

export async function POST() {
  try {
    const session = await getSession()

    if (session) {
      // Log activity
      await logActivity(session.user.id, 'LOGOUT', `User ${session.user.username} logged out`)
      
      // Delete session
      await deleteSession(session.token)
    }

    // Clear cookie
    cookies().delete('session_token')

    return Response.json({ 
      success: true, 
      message: 'Logout successful' 
    })
  } catch (error) {
    console.error('Logout error:', error)
    return Response.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}