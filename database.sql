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

