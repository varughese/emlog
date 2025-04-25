import { GoogleService } from './google';
import { CacheService } from './cacheService';

export class ServiceLocator {
    private static instance: ServiceLocator;
    private services: Map<string, any>;

    private constructor() {
        this.services = new Map();
    }

    public static getInstance(): ServiceLocator {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }
        return ServiceLocator.instance;
    }

    public getGoogleService(): GoogleService {
        if (!this.services.has('google')) {
            this.services.set('google', new GoogleService());
        }
        return this.services.get('google');
    }

    public getCacheService(): CacheService {
        if (!this.services.has('cache')) {
            this.services.set('cache', new CacheService());
        }
        return this.services.get('cache');
    }
} 