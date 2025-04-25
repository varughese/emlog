import express from 'express';
import { GoogleService } from '../services/google';
import { MarkdownService } from '../services/markdownService';

const router = express.Router();
const googleService = new GoogleService();
const markdownService = new MarkdownService();

// Auth routes
router.get('/auth/login', (req, res) => {
    const authUrl = googleService.getAuthUrl();
    res.redirect(authUrl);
});

router.get('/auth/callback', async (req: express.Request, res: express.Response) => {
    console.log('callback');
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Missing authorization code' });
    }

    try {
        const tokens = await googleService.getTokens(code);
        // Store tokens in session
        req.session.tokens = tokens;
        res.json({ success: true });
    } catch (error) {
        console.error('Error getting tokens:', error);
        res.status(500).json({ error: 'Failed to get access tokens' });
    }
});

// Middleware to check authentication
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.session.tokens) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
};

// Document routes
router.get('/documents/:documentId', requireAuth, async (req: express.Request, res: express.Response) => {
    const { documentId } = req.params;

    try {
        // Set the tokens for this request
        googleService.setCredentials(req.session.tokens);
        const document = await googleService.getDocument(documentId);
        const markdown = markdownService.convertToMarkdown(document);
        res.setHeader('Content-Type', 'text/markdown');
        res.send(markdown);
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ error: 'Failed to fetch document' });
    }
});

// Logout route
router.post('/auth/logout', (req: express.Request, res: express.Response) => {
    req.session.destroy((err: any) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ success: true });
    });
    res.redirect('/');
});

export default router; 