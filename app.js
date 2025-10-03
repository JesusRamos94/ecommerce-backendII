import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import { connectAuto } from './config/db/connect.config.js';
import { configurePassport } from './config/auth/passport.config.js';
import { logger } from './middleware/logger.middleware.js';

import sessionsRouter from './routes/sessions.router.js';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import ticketsRouter from './routes/tickets.router.js';
import passwordRouter from './routes/password.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);
app.use(express.static('public'));


await connectAuto();

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev',
  resave: false,
  saveUninitialized: false,
}));

configurePassport(passport);
app.use(passport.initialize());

app.use('/auth/sessions', sessionsRouter);
app.use('/auth/users', usersRouter);
app.use('/auth/password', passwordRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/tickets', ticketsRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'test') {
    console.error('↳ Error:', message);
    if (err.stack) console.error(err.stack);
  }
  res.status(status).json({ status: 'error', message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
