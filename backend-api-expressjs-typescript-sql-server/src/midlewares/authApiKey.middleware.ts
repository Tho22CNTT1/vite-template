import { Request, Response, NextFunction } from 'express';
import { env } from '../helpers/env.helpers';

export function authApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKeyFromClient = req.headers['x-api-key'];

    if (typeof apiKeyFromClient !== 'string') {
        return res.status(401).json({ message: 'API Key is missing' });
    }

    if (apiKeyFromClient !== env.API_KEY) {
        console.log('Server API Key:', env.API_KEY);
        console.log('Client API Key:', req.headers['x-api-key']);

        return res.status(403).json({ message: 'Invalid API Key' });
    }

    next();
}
