CREATE DATABASE IF NOT EXISTS mineguard CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mineguard;

CREATE TABLE IF NOT EXISTS incidents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  location VARCHAR(120) NOT NULL,
  severity ENUM('Low','Medium','High','Critical') NOT NULL DEFAULT 'Low',
  status ENUM('Open','Investigating','Resolved') NOT NULL DEFAULT 'Open',
  reported_by VARCHAR(120) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS production (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shift_name VARCHAR(40) NOT NULL,
  section_name VARCHAR(100) NOT NULL,
  output_tonnes DECIMAL(10,2) NOT NULL,
  target_tonnes DECIMAL(10,2) NOT NULL,
  recorded_by VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asset_name VARCHAR(120) NOT NULL,
  asset_code VARCHAR(60) NOT NULL UNIQUE,
  location VARCHAR(120) NOT NULL,
  status ENUM('Operational','Maintenance','Down') NOT NULL DEFAULT 'Operational',
  last_service DATE NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS environmental_readings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  location VARCHAR(120) NOT NULL,
  methane_pct DECIMAL(6,3) NOT NULL,
  carbon_monoxide_ppm DECIMAL(8,2) NOT NULL,
  oxygen_pct DECIMAL(5,2) NOT NULL,
  temperature_c DECIMAL(5,2) NOT NULL,
  ventilation_m_s DECIMAL(6,2) NOT NULL,
  source_name VARCHAR(120) NOT NULL DEFAULT 'Manual demo entry',
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
