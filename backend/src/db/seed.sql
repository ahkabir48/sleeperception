-- Delete existing user if any
DELETE FROM users WHERE username = 'Ahyan';

-- Insert initial admin user
-- Password is 'testing123' (hashed)
INSERT INTO users (username, password_hash) VALUES (
    'Ahyan',
    '$2b$10$ECVT3hFjh/3xaMDlaMNqceuqm2lj6ebeMT8lugF.LFgtNgyNl9s6y'
);

-- Clear existing data
DELETE FROM notifications;
DELETE FROM patient_sleep_data;
DELETE FROM patients;

-- Insert sample patients
INSERT INTO patients (id, name, room_number) VALUES
    ('ABC12', 'John Doe', '101'),
    ('DEF34', 'Jane Smith', '102'),
    ('GHI56', 'Michael Johnson', '103'),
    ('JKL78', 'Sarah Williams', '104'),
    ('MNO90', 'Robert Brown', '105'),
    ('PQR12', 'Emily Davis', '106'),
    ('STU34', 'David Wilson', '107'),
    ('VWX56', 'Lisa Anderson', '108');

-- Insert sample sleep data for each patient
INSERT INTO patient_sleep_data (patient_id, date, satisfactory_sleep, total_sleep) VALUES
    -- John Doe (ABC12) - Stable
    ('ABC12', '2024-04-29', 7.5, 8.0),
    ('ABC12', '2024-04-28', 7.2, 8.0),
    ('ABC12', '2024-04-27', 7.8, 8.2),
    -- Jane Smith (DEF34) - Warning
    ('DEF34', '2024-04-29', 5.5, 7.0),
    ('DEF34', '2024-04-28', 5.0, 7.5),
    ('DEF34', '2024-04-27', 5.8, 7.2),
    -- Michael Johnson (GHI56) - Urgent
    ('GHI56', '2024-04-29', 3.0, 6.0),
    ('GHI56', '2024-04-28', 2.5, 5.5),
    ('GHI56', '2024-04-27', 3.2, 6.2),
    -- Sarah Williams (JKL78) - Stable
    ('JKL78', '2024-04-29', 7.0, 8.0),
    ('JKL78', '2024-04-28', 7.5, 8.5),
    ('JKL78', '2024-04-27', 7.2, 8.0),
    -- Robert Brown (MNO90) - Warning
    ('MNO90', '2024-04-29', 4.5, 7.0),
    ('MNO90', '2024-04-28', 4.0, 6.5),
    ('MNO90', '2024-04-27', 4.8, 7.2),
    -- Emily Davis (PQR12) - Stable
    ('PQR12', '2024-04-29', 7.8, 8.5),
    ('PQR12', '2024-04-28', 7.5, 8.0),
    ('PQR12', '2024-04-27', 7.2, 8.0),
    -- David Wilson (STU34) - Urgent
    ('STU34', '2024-04-29', 2.5, 5.0),
    ('STU34', '2024-04-28', 2.0, 4.5),
    ('STU34', '2024-04-27', 2.8, 5.2),
    -- Lisa Anderson (VWX56) - Warning
    ('VWX56', '2024-04-29', 5.0, 7.5),
    ('VWX56', '2024-04-28', 4.5, 7.0),
    ('VWX56', '2024-04-27', 5.2, 7.2);

-- Insert sample notifications
INSERT INTO notifications (patient_id, title, time, is_read) VALUES
    ('GHI56', 'Sleep Pattern Alert - Urgent Attention Required', '2024-04-29 08:00:00', false),
    ('STU34', 'Critical Sleep Deficiency Detected', '2024-04-29 07:30:00', false),
    ('DEF34', 'Sleep Quality Warning', '2024-04-29 07:00:00', false),
    ('MNO90', 'Sleep Pattern Change Detected', '2024-04-29 06:30:00', false),
    ('VWX56', 'Sleep Quality Warning', '2024-04-29 06:00:00', false),
    ('ABC12', 'New Patient Admitted', '2024-04-28 15:00:00', false),
    ('JKL78', 'Sleep Pattern Improvement', '2024-04-28 14:30:00', false),
    ('PQR12', 'New Patient Admitted', '2024-04-28 14:00:00', false); 