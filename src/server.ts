import 'reflect-metadata';
import './shared/container';
import 'express-async-errors'

import express from 'express';

import dotenv from 'dotenv';

import { router } from './routes';

import createConnection from './database';

import { clientErrorHandler } from '@middlewares/clientErrorHandler';

import swaggerUi from "swagger-ui-express";

import swaggerFile from './swagger.json';

dotenv.config();

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(clientErrorHandler);

export { app };
