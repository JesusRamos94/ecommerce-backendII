import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { connectAuto } from './config/db/connect.config.js';
import { configurePassport } from './config/auth/passport.config.js';

import { logger } from './middleware/logger.middleware.js';

import usersRouter from './routes/users.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();

await connectAuto();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

configurePassport(passport);
app.use(passport.initialize());

app.use('/auth/users', usersRouter);
app.use('/auth/sessions', sessionsRouter);

app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ status: 'error', message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
});