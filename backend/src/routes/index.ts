import express, { Request, Response, Router } from 'express';
import { query } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse } from '../types';

const router = Router();

// Login route
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body as LoginRequest;
        
        // Get user from database
        const result = await query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        
        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash);
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
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get patient data
router.get('/patients', async (req, res) => {
    try {
        const result = await query('SELECT * FROM patients');
        res.json(result.rows);
    } catch (error) {
        console.error('Get patients error:', error);
        res.status(500).json({ error: 'Internal server error' });
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

export default router; 