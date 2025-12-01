'use client'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  // Don't show footer on login page
  if (pathname === '/login') {
    return null
  }

  return (
    <footer className="bg-light text-center py-3 mt-5">
      <div className="container">
        <p className="text-muted mb-0">
          <i className="fas fa-copyright me-1"></i>
          2024 Membership Management System. All rights reserved.
        </p>
      </div>
    </footer>
  )
}