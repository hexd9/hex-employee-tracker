INSERT INTO department (name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');
        

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 100000, 4),
        ('Salesperson', 80000, 4),
        ('Lead Engineer', 150000, 1),
        ('Software Engineer', 120000, 1),
        ('Account Manager', 160000, 2),
        ('Accountant', 125000, 2),
        ('Legal Team Lead', 250000, 3),
        ('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Alicia', 'Cortez', 2, NULL),
        ('Sophia', 'Ramirez', 2, 1),
        ('Graysen', 'Costa', 3, 1),
        ('Shane', 'Maddox', 4, 3),
        ('Aleah', 'Simon', 6, 3),
        ('Elijah', 'Baker', 4, 3),
        ('Isabella', 'Peterson', 6, 3),
        ('Mason', 'Flores', 3, 1),
        ('Ava', 'Reed', 5, 2),
        ('Carter', 'Gonzalez', 7, 4),
        ('Charlotte', 'Harris', 1, 4),
        ('Liam', 'Butler', 3, 1),
        ('Harper', 'Cruz', 2, 1),
        ('James', 'Perez', 4, 3);
