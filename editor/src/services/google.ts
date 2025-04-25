import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../config/env';
import fs from 'fs';
import path from 'path';
import { GoogleDocsDocument } from '../types/google';
import { ServiceLocator } from './serviceLocator';
import { CacheService } from './cacheService';

export class GoogleService {
    private oauth2Client: OAuth2Client;
    private docs: any;
    private cacheService: CacheService;

    constructor() {
        // Load client secrets from a local file
        this.oauth2Client = new google.auth.OAuth2(
            config.google.clientId,
            config.google.clientSecret,
            config.google.redirectUri
        );

        console.log(config);

        this.docs = google.docs({ version: 'v1', auth: this.oauth2Client });
        this.cacheService = ServiceLocator.getInstance().getCacheService();
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

    async getDocument(documentId: string): Promise<GoogleDocsDocument> {
        // Check cache first
        const cachedDocument = this.cacheService.get<GoogleDocsDocument>(documentId);
        if (cachedDocument) {
            return cachedDocument;
        }

        // If not in cache, fetch from Google
        const response = await this.docs.documents.get({
            documentId,
            auth: this.oauth2Client
        });

        const document = response.data;

        // Cache the document
        this.cacheService.set(documentId, document);

        return document;
    }
} 