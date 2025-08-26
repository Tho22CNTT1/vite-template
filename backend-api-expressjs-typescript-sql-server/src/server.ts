// src/server.ts
import { env } from './helpers/env.helpers';
import app from './app';
import { AppDataSource } from './data-source';
import 'reflect-metadata';
const PORT = env.PORT || 8080;
AppDataSource
    .initialize()
    .then(() => {
        console.log('intaliized');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("error", err)
    })