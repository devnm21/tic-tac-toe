import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import apiRouter from './routes/api';
import logger from 'jet-logger';
import { CustomError } from '@shared/errors';
import session from 'express-session';
import cors from 'cors';
import gameSocket from './socket/game';
import * as http from "http";
import * as socketio from 'socket.io'
// @ts-ignore
import sharedSession from 'express-socket.io-session';
// Constants
const app = express();
const server = http.createServer(app);


/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const expressSession = session({
    secret: process.env.COOKIE_SECRET || 'cookie secret 1234',
    resave: true,
    saveUninitialized: true,
})
app.use(expressSession);
app.use(cookieParser());

app.use(cors({
    origin: [process.env.CLIENT_HOST || 'http://localhost:3001'],
    credentials: true,
}));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}


/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use('/api', apiRouter);

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});



// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
const io: socketio.Server = require('socket.io')(server,{
    cors: {
        origin: [process.env.CLIENT_HOST || 'http://localhost:3001'],
        methods: ['GET', 'POST'],
        withCredentials: true,
    }
});
gameSocket(io);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
io.use(sharedSession(expressSession, {
    autoSave: true,
}))

// Export here and start in a diff file (for testing).
export default server;
