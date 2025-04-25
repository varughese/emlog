import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { config } from './config/env';
import routes from './routes';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Update this to match your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax'
    }
}));

// Routes
app.use('/', routes);

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
}); 