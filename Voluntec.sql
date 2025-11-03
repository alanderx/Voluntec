-- =====================
-- DATABASE SETUP
-- =====================
CREATE DATABASE IF NOT EXISTS Voluntec;
USE Voluntec;

-- =====================
-- VOLUNTEER (USER)
-- =====================
CREATE TABLE IF NOT EXISTS volunteer (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  is_moderator BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id)
);

-- =====================
-- SKILL
-- =====================
CREATE TABLE IF NOT EXISTS skill (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  type ENUM('soft', 'hard') NOT NULL,
  PRIMARY KEY (id)
);

-- =====================
-- VOLUNTEER_SKILL (junction table)
-- =====================
CREATE TABLE IF NOT EXISTS volunteer_skill (
  id INT NOT NULL AUTO_INCREMENT,
  volunteer_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (volunteer_id) REFERENCES volunteer(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skill(id) ON DELETE CASCADE
);

-- =====================
-- TASK
-- =====================
CREATE TABLE IF NOT EXISTS task (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY (id)
);

-- =====================
-- PROJECT
-- =====================
CREATE TABLE IF NOT EXISTS project (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description LONGTEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL,
  status ENUM('idea', 'ongoing', 'completed') DEFAULT 'idea',
  start_date DATETIME NULL,
  end_date DATETIME NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (created_by) REFERENCES volunteer(id) ON DELETE CASCADE
);

-- =====================
-- TASK_VOLUNTEER
-- =====================
CREATE TABLE IF NOT EXISTS task_volunteer (
  id INT NOT NULL AUTO_INCREMENT,
  task_id INT NOT NULL,
  volunteer_id INT NOT NULL,
  project_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
  FOREIGN KEY (volunteer_id) REFERENCES volunteer(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

-- =====================
-- TASK_SKILL
-- =====================
CREATE TABLE IF NOT EXISTS task_volunteer_skill (
  id INT NOT NULL AUTO_INCREMENT,
  task_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skill(id) ON DELETE CASCADE
);

-- =====================
-- PROJECT_VOLUNTEER
-- =====================
CREATE TABLE IF NOT EXISTS project_volunteer (
  id INT NOT NULL AUTO_INCREMENT,
  project_id INT NOT NULL,
  volunteer_id INT NOT NULL,
  is_manager BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
  FOREIGN KEY (volunteer_id) REFERENCES volunteer(id) ON DELETE CASCADE
);

-- =====================
-- PROJECT_SKILL
-- =====================
CREATE TABLE IF NOT EXISTS project_volunteer_skill (
  id INT NOT NULL AUTO_INCREMENT,
  project_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skill(id) ON DELETE CASCADE
);

-- =====================
-- TASK_ASSIGNMENT
-- =====================
CREATE TABLE IF NOT EXISTS task_assignment (
  id INT NOT NULL AUTO_INCREMENT,
  task_id INT NOT NULL,
  volunteer_id INT NOT NULL,
  project_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('assigned', 'in_progress', 'completed', 'canceled') DEFAULT 'assigned',
  PRIMARY KEY (id),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
  FOREIGN KEY (volunteer_id) REFERENCES volunteer(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

-- =====================
-- PERFORMANCE_ASSESSMENT
-- =====================
CREATE TABLE IF NOT EXISTS performance_assessment (
  id INT NOT NULL AUTO_INCREMENT,
  volunteer_id INT NOT NULL,
  project_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback LONGTEXT NULL,
  status ENUM('pending', 'evaluated') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (id),
  FOREIGN KEY (volunteer_id) REFERENCES volunteer(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

-- =====================
-- PROJECT_PARTICIPATION_REQUEST
-- =====================
CREATE TABLE IF NOT EXISTS project_participation_request (
  id INT NOT NULL AUTO_INCREMENT,
  project_id INT NOT NULL,
  volunteer_id INT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
  FOREIGN KEY (volunteer_id) REFERENCES volunteer(id) ON DELETE CASCADE
);
