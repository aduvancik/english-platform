/* CREATE part */
DROP TABLE IF EXISTS
    language_level, teacher, time_slot,
    teacher_language_level, study_group, student,
    teacher_time_slot, group_time_slot,
    student_time_slot;


CREATE TABLE language_level(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE teacher(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL
);

CREATE TABLE teacher_language_level(
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    language_level_id INT NOT NULL,
    FOREIGN KEY (teacher_id)
        REFERENCES teacher(id),
    FOREIGN KEY (language_level_id)
        REFERENCES language_level(id)
);

CREATE TABLE study_group(
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    language_level_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (teacher_id)
        REFERENCES teacher(id),
    FOREIGN KEY (language_level_id)
        REFERENCES language_level(id)
);

CREATE TABLE student(
    id INT AUTO_INCREMENT PRIMARY KEY,
    language_level_id INT NOT NULL,
    study_group_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    FOREIGN KEY (language_level_id)
        REFERENCES language_level(id),
    FOREIGN KEY (study_group_id)
        REFERENCES study_group(id)
);

CREATE TABLE time_slot(
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday',
                     'Friday', 'Saturday', 'Sunday') NOT NULL
);

CREATE TABLE teacher_time_slot(
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    time_slot_id INT NOT NULL,
    FOREIGN KEY (teacher_id)
        REFERENCES teacher (id),
    FOREIGN KEY (time_slot_id)
        REFERENCES time_slot(id)
);

CREATE TABLE group_time_slot(
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_group_id INT NOT NULL,
    time_slot_id INT NOT NULL,
    FOREIGN KEY (study_group_id)
        REFERENCES study_group(id),
    FOREIGN KEY (time_slot_id)
        REFERENCES time_slot(id)
);

CREATE TABLE student_time_slot(
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    time_slot_id INT NOT NULL,
    FOREIGN KEY (student_id)
        REFERENCES student (id),
    FOREIGN KEY (time_slot_id)
        REFERENCES time_slot(id)
);

/* INSERT part */
DROP PROCEDURE IF EXISTS GenerateTimeSlotData;

DELIMITER $$

CREATE PROCEDURE GenerateTimeSlotData()
BEGIN
    DECLARE hour INT DEFAULT 0;
    DECLARE day INT DEFAULT 1;
    DECLARE start_time TIME;
    DECLARE end_time TIME;

    WHILE day <= 7 DO
        WHILE hour <= 23 DO
            SET start_time = MAKETIME(hour, 0, 0);
            SET end_time = MAKETIME(hour + 1, 0, 0);

            INSERT INTO time_slot (start_at, end_at, day_of_week)
                VALUES (start_time, end_time, day);

            SET hour = hour + 1;
        END WHILE;

        SET hour = 0;
        SET day = day + 1;
    END WHILE;
END$$
DELIMITER ;


INSERT INTO language_level (name) VALUES
    ('A1'),
    ('A2'),
    ('B1'),
    ('B2'),
    ('C1'),
    ('C2');

INSERT INTO teacher (first_name, last_name, email, password_hash) VALUES
    ('Alice', 'Johnson', 'alice@example.com', 'd3f1e7fc3af52bba71087d77f0742aea'),
    ('Bob', 'Smith', 'bob@example.com', '5eb013a824130939c986a2443515bf78'),
    ('Julie', 'Butler', 'hgordon@example.com', '4c34fbc97ac1a9261653b1abc729b152'),
    ('Gregg', 'Roberts', 'patrickrogers@example.com', 'f87daacdbef28567dc430ea33601699e'),
    ('Cynthia', 'Fisher', 'davidlee@example.com', 'cb24ea5a69582dcc654c3bbb9027e6b5');

INSERT INTO teacher_language_level (teacher_id, language_level_id) VALUES
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 2);

INSERT INTO study_group (teacher_id, language_level_id, name) VALUES
    (1, 4, 'High Five'),
    (1, 5, 'Avant Garde'),
    (2, 1, 'Beginner Group A1'),
    (2, 2, 'Beginner Group A2');

INSERT INTO student (language_level_id, study_group_id, first_name, last_name, email, password_hash) VALUES
    (1, 4, 'Oleksandr', 'Salah', 'regeln@example.com', '6427435774b539b7eb87924b92d5d417'),
    (2, 1, 'Sofia', 'Hopp', 'sofa@example.com', 'hashed_password'),
    (3, 4, 'oleg', 'Krivogub', 'oleg.doe@example.com', '6427435774b539b7eb87924b92d5d417');

CALL GenerateTimeSlotData();
DROP PROCEDURE GenerateTimeSlotData;

INSERT INTO teacher_time_slot (teacher_id, time_slot_id) VALUES
    (1, 34),
    (1, 46),
    (1, 58),
    (1, 66),
    (2, 10),
    (2, 37),
    (2, 76),
    (2, 80);

INSERT INTO group_time_slot (study_group_id, time_slot_id) VALUES
    (1, 34),
    (1, 46),
    (1, 58),
    (2, 66),
    (3, 10),
    (3, 80),
    (4, 37);

INSERT INTO student_time_slot (student_id, time_slot_id) VALUES
    (1, 10),
    (1, 20),
    (1, 30),
    (1, 34),
    (1, 54),
    (1, 66);