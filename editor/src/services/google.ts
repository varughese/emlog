import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../config/env';
import fs from 'fs';
import path from 'path';

export class GoogleService {
    private oauth2Client: OAuth2Client;
    private docs: any;

    constructor() {
        // Load client secrets from a local file
        this.oauth2Client = new google.auth.OAuth2(
            config.google.clientId,
            config.google.clientSecret,
            config.google.redirectUri
        );

        console.log(config);

        this.docs = google.docs({ version: 'v1', auth: this.oauth2Client });
    }

    getAuthUrl(): string {
        const scopes = [
            'https://www.googleapis.com/auth/documents.readonly',
            'https://www.googleapis.com/auth/drive.readonly'
        ];

        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });
    }

    async getTokens(code: string) {
        const { tokens } = await this.oauth2Client.getToken(code);
        this.oauth2Client.setCredentials(tokens);
        return tokens;
    }

    setCredentials(tokens: any) {
        this.oauth2Client.setCredentials(tokens);
    }

    async getDocument(documentId: string) {
        try {
            const response = await this.docs.documents.get({
                documentId,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching document:', error);
            throw error;
        }
    }
} 