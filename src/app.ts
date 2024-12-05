import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export function setupRoutes(db: Pool) {
    const app = express();
    app.use(express.json());

    app.post('/users', async (req: Request, res: Response): Promise<any> => {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const userId = uuidv4();

        try {
            // Save to database
            await db.query('INSERT INTO users (id, name, email) VALUES ($1, $2, $3)', [userId, name, email]);

            res.status(201).json({ message: 'User created' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return app;
}