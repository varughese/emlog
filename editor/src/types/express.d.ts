import 'express-session';
import { Request as ExpressRequest } from 'express';

declare module 'express-session' {
    interface SessionData {
        tokens?: {
            access_token: string;
            refresh_token: string;
            scope: string;
            token_type: string;
            expiry_date: number;
        };
    }
}

declare module 'express' {
    interface Request {
        session: SessionData;
    }
} 