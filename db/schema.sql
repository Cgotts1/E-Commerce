-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;







-- DROP DATABASE IF EXISTS employee_db;
-- CREATE DATABASE employee_db;

-- USE employee_db;


-- CREATE TABLE department(

--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

--     name VARCHAR(30)
-- );


-- CREATE TABLE role(

--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

--     title VARCHAR(30),

--     salary DECIMAL,

--     department_id INT

-- );

-- CREATE TABLE employee(

--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

--     first_name VARCHAR(30),

--     last_name VARCHAR(30),

--     role_id INT,

--     manager_id INT
-- );


-- INSERT INTO department ( name)
-- VALUES ( "Sales"),
--        ( "Engineering"),
--        ( "Finance"),
--        ( "Legal");



-- INSERT INTO role (title, salary, department_id)
-- VALUES ( "Sales Lead", 100000, 1),
--        ("Salesperson", 80000, 1),
--        ("Lead Engineer", 150000, 2),
--        ("Software Engineer", 120000, 2),
--        ("Account Manager", 160000, 3),
--        ("Accountant", 125000, 3),
--        ("Legal Team Lead", 250000, 4),
--        ("Lawyer", 190000, 4);

      



-- INSERT INTO employee ( first_name, last_name, role_id, manager_id)
-- VALUES ( "John", "Doe", 1, null),
--        ( "Mike", "Chan", 1, 1),
--        ( "Ashley", "Rodriguez", 1, null),
--        ( "Kevin", "Tupik", 1, 3),
--        ( "Kunal", "Singh", 1, null),
--        ( "Malia", "Brown", 1, 5),
--        ( "Sarah", "Lourd", 1, null),
--        ( "Tom", "Allen", 1, 7);
       
       
-- SELECT * 
-- FROM employee;

-- SELECT *
-- FROM department;

-- SELECT * 
-- FROM role;
