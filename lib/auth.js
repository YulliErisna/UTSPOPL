import { cookies } from 'next/headers'
import db from './db'

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get('session_token')?.value

  if (!token) {
    return null
  }

  try {
    const [sessions] = await db.execute(
      `SELECT s.*, u.id as user_id, u.username, u.name, u.email, u.role 
       FROM sessions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.token = ? AND s.expires_at > NOW()`,
      [token]
    )

    if (sessions.length === 0) {
      return null
    }

    return {
      token,
      user: {
        id: sessions[0].user_id,
        username: sessions[0].username,
        name: sessions[0].name,
        email: sessions[0].email,
        role: sessions[0].role
      }
    }
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function createSession(userId) {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  try {
    await db.execute(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt]
    )

    return token
  } catch (error) {
    console.error('Error creating session:', error)
    return null
  }
}

export async function deleteSession(token) {
  try {
    await db.execute('DELETE FROM sessions WHERE token = ?', [token])
    return true
  } catch (error) {
    console.error('Error deleting session:', error)
    return false
  }
}

export async function cleanExpiredSessions() {
  try {
    await db.execute('DELETE FROM sessions WHERE expires_at < NOW()')
  } catch (error) {
    console.error('Error cleaning expired sessions:', error)
  }
}

function generateToken() {
  return Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}

export async function hashPassword(password) {
  // Simple hash for demo - in production use bcrypt
  const crypto = require('crypto')
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function verifyPassword(password, hash) {
  const hashedPassword = await hashPassword(password)
  return hashedPassword === hash
}

export async function logActivity(userId, action, description, ipAddress = null) {
  try {
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
      [userId, action, description, ipAddress]
    )
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}