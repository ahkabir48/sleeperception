import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 