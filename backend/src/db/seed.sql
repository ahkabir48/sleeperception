-- Delete existing user if any
DELETE FROM users WHERE username = 'Ahyan';

-- Insert initial admin user
-- Password is 'testing123' (hashed)
INSERT INTO users (username, password_hash) VALUES (
    'Ahyan',
    '$2b$10$ECVT3hFjh/3xaMDlaMNqceuqm2lj6ebeMT8lugF.LFgtNgyNl9s6y'
); 