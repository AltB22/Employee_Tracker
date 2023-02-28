CREATE DATABASE inventory_db;

-- Create two new databases --
DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;

-- Use inventory_db --
USE inventory_db;

-- See database in use --
SELECT DATABASE();

SHOW TABLES

SELECT *
FROM course_names;

SELECT department, COUNT(id) AS number_courses
FROM course_names
GROUP BY department;

SELECT department, SUM(total_enrolled) AS sum_enrolled
FROM course_names
GROUP BY department;

SELECT *
FROM course_names
JOIN department ON course_names.department = department.id;
-- ON basically means wherever

SELECT department, COUNT(id) AS number_courses

SHOW DATABASES;

ON DELETE SET NULL

GROUP BY table_name;

SOURCE db/queries.sql