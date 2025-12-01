-- Create database
CREATE DATABASE IF NOT EXISTS membership_db;
USE membership_db;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create members table
CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Premium', 'Premium membership with full access'),
('Standard', 'Standard membership with basic access'),
('Basic', 'Basic membership with limited access'),
('VIP', 'VIP membership with exclusive benefits');

-- Insert sample members
INSERT INTO members (name, email, phone, address, category_id) VALUES
('John Doe', 'john@example.com', '081234567890', 'Jl. Merdeka No. 123', 1),
('Jane Smith', 'jane@example.com', '081234567891', 'Jl. Sudirman No. 456', 2),
('Bob Johnson', 'bob@example.com', '081234567892', 'Jl. Thamrin No. 789', 1),
('Alice Brown', 'alice@example.com', '081234567893', 'Jl. Gatot Subroto No. 321', 3),
('Charlie Wilson', 'charlie@example.com', '081234567894', 'Jl. HR Rasuna Said No. 654', 4);

-- Tambahkan tabel users untuk login
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
-- Password di-hash menggunakan SHA-256
INSERT INTO users (username, password, name, email, role) VALUES
('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Administrator', 'admin@membership.com', 'admin'),
('user', 'ee0b0df4a336b68b106cef1c9df84650ae02c35194ad03ab9e004c4bb43d604f', 'Regular User', 'user@membership.com', 'user');

-- Tambahkan tabel sessions untuk menyimpan session
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tambahkan tabel activity_logs untuk tracking aktivitas
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);