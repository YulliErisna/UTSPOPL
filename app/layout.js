import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Membership Management System',
  description: 'A comprehensive membership management system with CRUD operations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="container-fluid py-4">
          {children}
        </main>
        <Footer />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/">
          <i className="fas fa-users me-2"></i>
          Membership System
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fas fa-tachometer-alt me-1"></i>Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/members">
                <i className="fas fa-users me-1"></i>Members
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/categories">
                <i className="fas fa-tags me-1"></i>Categories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">
                <i className="fas fa-chart-bar me-1"></i>Reports
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
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
