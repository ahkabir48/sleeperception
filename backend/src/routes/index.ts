import express, { Request, Response, Router } from 'express';
import { query } from '../db';
import pool from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse, CreatePatientRequest } from '../types';

const router = Router();

// Login route
router.post('/login', async (req: Request, res: Response) => {
    try {
        console.log('Login attempt received:', req.body);
        const { username, password } = req.body as LoginRequest;
        
        // Get user from database
        console.log('Querying database for user:', username);
        const result = await query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        
        if (result.rows.length === 0) {
            console.log('No user found for username:', username);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        console.log('User found:', { id: user.id, username: user.username });
        
        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash);
        console.log('Password validation result:', isValid);
        
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'velocityhealthchallenge',
            { expiresIn: '24h' }
        );

        // Return user info and token
        const { password_hash, ...userWithoutPassword } = user;
        res.json({
            user: userWithoutPassword,
            token
        });
    } catch (error: any) {
        console.error('Login error details:', error);
        res.status(500).json({ error: 'Internal server error', details: error?.message || 'Unknown error' });
    }
});

// Get patient data
router.get('/patients', async (req, res) => {
    try {
        console.log('Attempting to fetch patients...');
        const result = await query('SELECT * FROM patients');
        console.log('Patients query result:', result.rows);
        res.json(result.rows);
    } catch (error: any) {
        console.error('Get patients error details:', error);
        res.status(500).json({ error: 'Internal server error', details: error?.message || 'Unknown error' });
    }
});

// Get patient sleep data
router.get('/patients/:id/sleep', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            'SELECT * FROM patient_sleep_data WHERE patient_id = $1 ORDER BY date DESC LIMIT 7',
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Get sleep data error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get notifications
router.get('/notifications', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM notifications WHERE is_read = false ORDER BY time DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new patient
router.post('/patients', async (req: Request, res: Response) => {
    try {
        const { name, room_number } = req.body as CreatePatientRequest;
        
        // Validate input
        if (!name || !room_number) {
            return res.status(400).json({ error: 'Name and room number are required' });
        }

        // Generate unique 5-character ID and verify it doesn't exist
        let id = '';
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 10; // Prevent infinite loop

        while (!isUnique && attempts < maxAttempts) {
            // Generate 5-character ID (uppercase letters and numbers)
            id = Math.random().toString(36).substring(2, 7).toUpperCase();
            
            // Check if ID exists
            const existingPatient = await query(
                'SELECT id FROM patients WHERE id = $1',
                [id]
            );
            
            if (existingPatient.rows.length === 0) {
                isUnique = true;
            }
            
            attempts++;
        }

        if (!isUnique) {
            return res.status(500).json({ error: 'Failed to generate unique ID' });
        }

        // Insert into database
        const result = await query(
            'INSERT INTO patients (id, name, room_number) VALUES ($1, $2, $3) RETURNING *',
            [id, name, room_number]
        );

        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        console.error('Create patient error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a patient and their sleep data
router.delete('/patients/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const { id } = req.params;
        console.log('Received delete request for patient ID:', id);
        
        // Start a transaction
        await client.query('BEGIN');
        console.log('Transaction started');

        // First delete sleep data
        const sleepDeleteResult = await client.query(
            'DELETE FROM patient_sleep_data WHERE patient_id = $1 RETURNING *',
            [id]
        );
        console.log('Deleted sleep data rows:', sleepDeleteResult.rowCount);

        // Then delete the patient
        const patientDeleteResult = await client.query(
            'DELETE FROM patients WHERE id = $1 RETURNING *',
            [id]
        );
        console.log('Deleted patient rows:', patientDeleteResult.rowCount);

        if (patientDeleteResult.rows.length === 0) {
            console.log('No patient found with ID:', id);
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Commit the transaction
        await client.query('COMMIT');
        console.log('Transaction committed successfully');

        res.json({ 
            message: 'Patient and associated sleep data deleted successfully',
            deletedPatient: patientDeleteResult.rows[0],
            deletedSleepDataCount: sleepDeleteResult.rowCount
        });
    } catch (error) {
        // Rollback the transaction on error
        console.error('Error in delete operation:', error);
        await client.query('ROLLBACK');
        console.log('Transaction rolled back due to error');
        res.status(500).json({ error: 'Failed to delete patient' });
    } finally {
        client.release();
        console.log('Database client released');
    }
});

// Delete a notification
router.delete('/notifications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            'DELETE FROM notifications WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router; 