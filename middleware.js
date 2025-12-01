import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Public paths that don't require authentication
  const publicPaths = ['/login', '/api/auth/login']
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  // Get session token from cookies
  const token = request.cookies.get('session_token')?.value
  
  // If trying to access login page while authenticated, redirect to home
  if (isPublicPath && token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // If trying to access protected page without authentication, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}