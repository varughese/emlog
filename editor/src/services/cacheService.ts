import fs from 'fs';
import { config } from '../config/env';

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number;
}

export class CacheService {
    private cache: Map<string, CacheEntry<any>>;
    private readonly DEFAULT_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
    private readonly CACHE_FILE = config.cache.path;

    constructor() {
        this.cache = new Map();
        this.loadCache();
    }

    private loadCache(): void {
        try {
            if (fs.existsSync(this.CACHE_FILE)) {
                const data = JSON.parse(fs.readFileSync(this.CACHE_FILE, 'utf-8'));
                // Convert the plain object back to a Map
                this.cache = new Map(Object.entries(data));

                // Clean up expired entries
                const now = Date.now();
                for (const [key, entry] of this.cache.entries()) {
                    if (now - entry.timestamp > entry.ttl) {
                        this.cache.delete(key);
                    }
                }
                // Save the cleaned cache
                this.saveCache();
            }
        } catch (error) {
            console.error('Error loading cache:', error);
            this.cache = new Map();
        }
    }

    private saveCache(): void {
        try {
            // Convert Map to plain object for JSON serialization
            const data = Object.fromEntries(this.cache);
            fs.writeFileSync(this.CACHE_FILE, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error saving cache:', error);
        }
    }

    set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl
        });
        this.saveCache();
    }

    get<T>(key: string): T | null {
        const entry = this.cache.get(key);

        if (!entry) {
            return null;
        }

        const now = Date.now();
        if (now - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            this.saveCache();
            return null;
        }

        return entry.data as T;
    }

    delete(key: string): void {
        this.cache.delete(key);
        this.saveCache();
    }

    clear(): void {
        this.cache.clear();
        this.saveCache();
    }
} 