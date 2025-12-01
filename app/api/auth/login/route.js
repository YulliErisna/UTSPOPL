import db from '../../../../lib/db'
import { createSession, hashPassword, logActivity } from '../../../../lib/auth'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return Response.json({ 
        success: false, 
        message: 'Username and password are required' 
      }, { status: 400 })
    }

    // Find user
    const [users] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )

    if (users.length === 0) {
      return Response.json({ 
        success: false, 
        message: 'Invalid username or password' 
      }, { status: 401 })
    }

    const user = users[0]

    // Verify password
    const hashedPassword = await hashPassword(password)
    
    if (hashedPassword !== user.password) {
      return Response.json({ 
        success: false, 
        message: 'Invalid username or password' 
      }, { status: 401 })
    }

    // Create session
    const token = await createSession(user.id)

    if (!token) {
      return Response.json({ 
        success: false, 
        message: 'Failed to create session' 
      }, { status: 500 })
    }

    // Set cookie
    cookies().set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    // Log activity
    await logActivity(user.id, 'LOGIN', `User ${username} logged in`)

    return Response.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}